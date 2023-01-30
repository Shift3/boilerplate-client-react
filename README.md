# Boilerplate Client React

Branch Status

develop: Shift3
main: Shift3
This batteries-included boilerplate provides a starting point for efficient development of a React clien, that can interact with a backend API.

Note: This repository is compatible with our primary Django backend dj_starter_demo, as well as our node-js-backend.s

## Features

This boilerplate application provides the following features:

- User Authentication
- Notifications
- Payment Processing
- xxxxx
- xxxxx
- xxxxx

## Staging URL

A production demo of the project can be found at [production site](https://boilerplate-client-react-prod.shift3sandbox.com) or
to a staging demo with new features, can be found at [staging site](https://boilerplate-client-react.shift3sandbox.com/).

## Quick Start

To get started, make sure you have yarn installed on your local machine. If you have already installed our [laptop script](https://github.com/Shift3/laptop), you should already have yarn.

1. Clone this repository and install dependencies via `yarn install`.
2. Start the project in development mode via `yarn start`.

Open [http://localhost:4200](http://localhost:4200) to view the project in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Testing

Run `yarn test` to execute the unit test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Run `yarn test-cov` for a test coverage report in interactive watch mode.\
For more information please refer to the react [Coverage Reporting](https://create-react-app.dev/docs/running-tests/#coverage-reporting) documentation.

## Building

To build the app for production, run `yarn build`. This will correctly bundle React in production mode and optimize the build for the best performance. The build will be minified and the filenames will include hashes. Your app is now ready to be deployed!

## Deployment

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

## Bug Report

## Submit Feature Request

## Contributing
