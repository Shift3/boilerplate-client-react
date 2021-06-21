# Boilerplate Client React

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test-cov`

Runs the test coverage report in interactive watch mode.\
For more information please refer to the react [Coverage Reporting](https://create-react-app.dev/docs/running-tests/#coverage-reporting) documentation.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Staging URL

<https://boilerplate-client-react.shift3sandbox.com/>

## Deployment

Deploying the application requires having the `aws` and `terraform` cli commands installed on your machine. See the following links for OS specific installation instructions:

- [AWS CLI installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [Terraform installation](https://learn.hashicorp.com/tutorials/terraform/install-cli)

### AWS

Deploying to AWS requires having AWS credentials configured on the machine. The deployment script is set to look for an AWS profile named `shift3`. See the following links for documentation on configuring the AWS CLI, creating an AWS credential file, and creating a named profile:

- [Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- [Named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)

### Terraform

Configuring, building, and changing the AWS infrastructure **for the sandbox** is handled by Terraform. As a prerequisite, Terraform needs the AWS credentials configured as described in the [above section](#aws), which developers should already have or can access through Zoho Vault.

Terraform also needs the project secrets saved in `terraform/staging/terraform.tfvars`. This file is not committed to version control since it can contain sensitive information such as database credentials and should be added locally. Create the `terraform/staging/terraform.tfvars` file with the following structure:

```
profile = "shift3"

region = "us-west-2"

web_domain_name = ""

```

| Secret          |                                                                                             Note |
| :-------------- | -----------------------------------------------------------------------------------------------: |
| profile         |                              This must match the AWS credentials name on the development machine |
| region          |                                                                      This is usually `us-west-2` |
| web_domain_name | This will be the web domain name for the project, an example may be: `example.shift3sandbox.com` |

After adding the `terraform/staging/terraform.tfvars` file, `cd` into the `terraform/staging` directory and run the following commands to configure and build the AWS infrastructure for the sandbox environment

```
terraform init
terraform apply
```

The infrastructure can be updated by changing the Terraform configuration files and running these commands again.

### Environment Configuration

After provisioning the AWS instance with Terraform, the project environment variables need to be updated with the new server values.

Update the `apiRoute` property in `environment.staging.ts` with the provisioned sandbox instance url.

### Build and Deploy

The boilerplate project provides three ways to build and deploy the application to the staging environment.

1. Manually set the `BUILD_DIRECTORY_PATH` and `AWS_SANDBOX_URL` environment variables to your project values. Then, use `yarn` to run the `deploy:staging` script. For example:

```bash
export BUILD_DIRECTORY_PATH=./build

export AWS_SANDBOX_URL=example.shift3sandbox.com

yarn run deploy:staging
```

2. In the provided `deploy_staging.sh` script, set the `BUILD_DIRECTORY_PATH` and `AWS_SANDBOX_URL` variables to your project values. Then, run the `deploy_staging.sh` script.

```bash
# use the sh command
sh deploy_staging.sh

# or, make the script executable
sudo chmod +x ./deploy_staging.sh

# then run as
./deploy_staging
```

3. In `package.json`, updated the `"deploy:staging"` script by replacing the `$BUILD_DIRECTORY_PATH` and `$AWS_SANDBOX_URL` placeholders with your project values. Then use `yarn` to run the `deploy:staging` script. For example:

```json
// Update deploy:staging script
{
  ...,
  "scripts": {
    ...
    "deploy:staging": "aws s3 sync ./build s3://example.shift3sandbox.com --profile shift3 --delete"
    ...
  }
}
```

```bash
# then run
yarn run deploy:staging
```

**_Warning:_** If you update the `deploy:staging` script as described in the third method, the first two methods will no longer work.

## Development

### Local Development

To work with the project directly, the development machine needs `node` and `yarn` installed.

### Development Server

Run `yarn install` to install dependencies. Then run `yarn start` to start the development server listening on port 4200. You can view the app in the browser by navigating to `http://localhost:4200`. The app will automatically reload if any source files are changed.

### Docker

This project can be run as a Docker container (it is not recommended for involved development because it makes it harder to debug the codebase). Run `docker-compose up` to build and run the container. The app will be mapped to the port 4200 on your local machine and you can view the app in the browser by navigating to `http://localhost:4200`. It supports hot reloading so the app will automatically reload if any source files are changed.

### Template Repository

This project is configured as a [template repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#about-repository-templates). It creates one commit in the new project based on the template instead of the entire original boilerplate history.

### Initializing the Project

### Prettier

This project uses Prettier to enforce code style. It is highly opinionated by design with relatively scant options for customization. The thought process behind it is to ignore personal styling preferences and instead embrace consistency. There are .prettierrc and .prettierignore configuration files to adjust some options. Prettier is also wired up to a pre-commit hook. This DOES slightly slow down git, as it runs the hook on staged files every time git commit is executed.

Prettier can be configured within editors so that it formats files on save, which helps minimize any changes the pre-commit hook would need to make.

### CI

### Local Development

### Webpack Bundle Analyzer

### Development Server

### Code Scaffolding

### Build

### Stagin Build

### Running Unit Tests

### Running End-to-End Tests

### Additional Resources
