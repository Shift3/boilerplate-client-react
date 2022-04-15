provider "aws" {
  version = "4.8.0"
  profile = "${var.profile}"
  region  = "${var.region}"

  assume_role {
    role_arn = var.assume_role_arn
  }
}

terraform {
  backend "s3" {
    bucket  = "shift3-terraform-state"
    key     = "boilerplate-client-react/staging/terraform.tfstate"
    region  = "us-west-2"
    profile = "shift3"
  }
}

module "cloudfront" {
  source          = "../cloudfront"
  web_domain_name = var.web_domain_name
  assume_role_arn = var.assume_role_arn
}