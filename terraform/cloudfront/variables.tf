variable "assume_role_arn" {
  description = "Assume Role ARN"
}

variable "environment" {
  description = "This value will be used to tag the resources created with the environment (staging | production | dev)"
  default     = "staging"
}

variable "profile" {
  description = "Name of your profile inside ~/.aws/credentials"
  default     = "shift3"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}

variable "secure_response_headers_id"{
  description = "Default security header policy ID (shift3 account)"
  default = "b52c8245-8965-4882-a446-8773a50b46ab"
}

variable "route53_zone" {
  description = "Zone for Route53"
  default = "shift3sandbox.com."
}