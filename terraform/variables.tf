variable "aws_profile" {
  default = "BWTC-Developer"
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
  default = "a8d5b0a7-fb10-48d5-a6e0-8c15df90c99d"
  description = "Default security header policy ID for React Boilerplate (shift3 account)"
}

variable "route53_zone" {
  default = "shift3sandbox.com"
  description = "Zone for Route53"
}

variable "environment" {
  default = "staging"
  description = "This value will be used to tag the resources created with the environment (staging | production | dev)"
}