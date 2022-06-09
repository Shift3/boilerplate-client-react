variable "aws_profile" {
  default = "shift3"
  description = "Name of your profile inside ~/.aws/credentials"
}

variable "aws_region" {
  default     = "us-west-2"
  description = "Defines which region your app should be deployed"
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

variable "environment" {
  default = "staging"
  description = "This value will be used to tag the resources created with the environment (staging | production | dev)"
}