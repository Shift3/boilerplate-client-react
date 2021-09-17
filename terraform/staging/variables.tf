variable "assume_role_arn" {
  default     = "arn:aws:iam::008036621198:role/SuperDevAssumeRole"
  description = "Assume Role ARN"
}

variable "profile" {
  default     = "shift3"
  description = "Name of your profile inside ~/.aws/credentials"
}

variable "region" {
  default     = "us-west-2"
  description = "Defines where your app should be deployed"
}

variable "web_domain_name" {
  description = "Domain name for the s3 bucket"
}
