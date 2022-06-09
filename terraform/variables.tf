# Any values that do not have a default value must be defined within the environment folder
# Ex. web_domain_name should defined in environment/<environmentName>.tfvars

variable "aws_profile" {
  default = "shift3"
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
  default = "b52c8245-8965-4882-a446-8773a50b46ab"
  description = "Default security header policy ID (shift3 account)"
}

variable "route53_zone" {
  default = "shift3sandbox.com"
  description = "Zone for Route53"
}

variable "cloudfront_gh_module" {
  default = "git@github.com:Shift3/terraform-modules.git//modules/aws/cloudfront"
  description = "This value points to our cloudfront module stored within our BWTC github repo"
}