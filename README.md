Boilerplate Client React
Branch Status

develop: Shift3
main: Shift3
This boilerplate provides a starting point for building a React client that can interact with a backend API. It includes a wiki that goes into more detail about the project and its implementation.

Note: This repository used to be compatible with our NestJS backend, however we have switched to using django as our primary backend. If you are looking for the NestJS-compatible version, it can still be found on the nestjs-compatibility branch.

Staging URL
A demo of the project can be found on our production site, or to see a demo with new features, check out our staging site.

Quick Start
To get started, make sure you have yarn installed on your local machine. If you have already installed our laptop script, you should already have yarn.

Install dependencies via yarn install
Start the project in development mode via yarn start
Open http://localhost:4200 to view the project in the browser.
The page will reload if you make edits. You will also see any lint errors in the console.

Testing
To run unit tests, use yarn test.

To generate a test coverage report, use yarn test-cov.

Building
To build the app for production, run yarn build. This will correctly bundle React in production mode and optimize the build for the best performance. The build will be minified and the filenames will include hashes. Your app is now ready to be deployed!

Deployment
Deploying the application requires having the AWS and Terraform CLI commands installed on your machine. See the following links for OS-specific installation instructions:

AWS CLI installation
Terraform installation
The deployment process also requires having AWS credentials configured on the machine, and the deployment script is set to look for an AWS profile named BWTC-Developer.

AWS SSO Configuration
Creating a named profile
Before deploying or initializing Terraform, you must have AWS SSO configured and then login with the following command:

Copy code
aws sso login --profile BWTC-Developer
Terraform also needs the project secrets saved in terraform/staging/terraform.tfvars. This file is not committed to version control since it can contain sensitive information such as database credentials and should be added locally. Create the terraform/staging/terraform.tfvars file with the following structure:

Copy code
profile = "BWTC-Developer"
region = "us-west-2"
web_domain_name = ""
Secrets

profile: This must match the AWS credentials name on the development machine
region: This is usually us-west-2
web_domain_name: This will be
