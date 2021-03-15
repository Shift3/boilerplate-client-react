provider "aws" {
  version = "2.58"
  alias   = "east"
  profile = "${var.profile}"
  region  = "us-east-1"

  assume_role {
    role_arn = var.assume_role_arn
  }
}

data "aws_route53_zone" "zone" {
  name         = "shift3sandbox.com."
  private_zone = false
}

resource "aws_acm_certificate" "cert_cloudfront_east" {
  provider                  = "aws.east"
  domain_name               = "${var.web_domain_name}"
  subject_alternative_names = ["www.${var.web_domain_name}"]
  validation_method         = "DNS"
}

resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.zone.id}"
  records = ["${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_route53_record" "cert_validation_west_www" {
  name    = "${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.1.resource_record_name}"
  type    = "${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.1.resource_record_type}"
  zone_id = "${data.aws_route53_zone.zone.id}"
  records = ["${aws_acm_certificate.cert_cloudfront_east.domain_validation_options.1.resource_record_value}"]
  ttl     = 60
}

resource "aws_s3_bucket" "web_bucket" {
  bucket = "${var.web_domain_name}"
  acl    = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
    {
        "Sid": "PublicReadForGetBucketObjects",
        "Effect": "Allow",
        "Principal": {
            "AWS": "*"
         },
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::${var.web_domain_name}/*"
    }]
}
EOF
}

# Create Cloudfront distribution
resource "aws_cloudfront_distribution" "prod_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.web_bucket.bucket_domain_name}"
    origin_id   = "S3-${aws_s3_bucket.web_bucket.bucket}"
  }

  aliases = ["${var.web_domain_name}", "www.${var.web_domain_name}"]

  depends_on = ["aws_route53_record.cert_validation"]

  # By default, show index.html file
  default_root_object = "index.html"
  enabled             = true

  # If there is a 404, return index.html with a HTTP 200 Response
  custom_error_response {
    error_caching_min_ttl = 3000
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.web_bucket.bucket}"

    # Forward all query strings, cookies and headers
    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern     = "index.html"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "S3-${aws_s3_bucket.web_bucket.bucket}"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  # Distributes content to US and Europe
  price_class = "PriceClass_100"

  # Restricts who is able to access this content
  restrictions {
    geo_restriction {
      # type of restriction, blacklist, whitelist or none
      restriction_type = "none"
    }
  }

  # SSL certificate for the service.
  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.cert_cloudfront_east.arn}"
    ssl_support_method  = "sni-only"
  }
}

# Create Route 53
resource "aws_route53_record" "cloud_front" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name    = "${var.web_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.prod_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.prod_distribution.hosted_zone_id}"
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "cloud_front_www" {
  zone_id = "${data.aws_route53_zone.zone.id}"
  name    = "www.${var.web_domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.prod_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.prod_distribution.hosted_zone_id}"
    evaluate_target_health = true
  }
}
