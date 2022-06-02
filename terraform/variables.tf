variable "aws_profile" {
  description = "Name of your profile inside ~/.aws/credentials"
}

variable "aws_region" {
  default     = "us-west-2"
  description = "Defines where your app should be deployed"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}

variable "secure_response_headers_id"{
  description = "Default security header policy ID (shift3 account)"
}

variable "route53_zone" {
  description = "Zone for Route53"
}