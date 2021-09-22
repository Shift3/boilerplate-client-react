# Boilerplate Client React

| Branch      | Status                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| development | [![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-react.svg?style=shield&circle-token=7906113b0233ea67936098a26da5e8f598eec7ac)](https://circleci.com/gh/Shift3/boilerplate-client-react)                     |
| main        | [![Shift3](https://circleci.com/gh/Shift3/boilerplate-client-react/tree/main.svg?style=shield&circle-token=7906113b0233ea67936098a26da5e8f598eec7ac)](https://circleci.com/gh/Shift3/boilerplate-client-react/tree/main) |

This boilerplate has a [wiki](https://github.com/Shift3/boilerplate-client-react/wiki) which explains the project and its implementation in much greater detail than the code comments.

- [Boilerplate Client React](#boilerplate-client-react)
  - [Staging URL](#staging-url)
      - [Quick Start](#quick-start)
      - [Running unit tests](#running-unit-tests)
    - [Running test coverage](#running-test-coverage)
    - [Build](#build)
  - [Learn More](#learn-more)
  - [Deployment](#deployment)
    - [AWS](#aws)
    - [Terraform](#terraform)
    - [Environment Configuration](#environment-configuration)
    - [Build and Deploy](#build-and-deploy)
  - [Development](#development)
    - [Local Development](#local-development)
    - [Development Server](#development-server)
    - [Docker](#docker)
    - [Template Repository](#template-repository)
    - [Initializing the Project](#initializing-the-project)
    - [Prettier](#prettier)
    - [CI](#ci)
      - [Wiki Automation](#wiki-automation)
    - [Webpack Bundle Analyzer](#webpack-bundle-analyzer)
    - [React Hook Form](#react-hook-form)
    - [Yup](#yup)
      - [resolvers](#resolvers)
    - [Staging Build](#staging-build)
    - [Additional Resources](#additional-resources)

## Staging URL

<https://boilerplate-client-angular.shift3sandbox.com/>

#### Quick Start

To start the project, make sure yarn is installed on your local machine. If you have already installed our [laptop script](https://github.com/Shift3/laptop), you should already have yarn.

1. Install Dependencies via `yarn install`
2. Start the Project in development mode via `yarn start`

Open [http://localhost:4200](http://localhost:4200) to view the project in the browser.

The page will reload if you make edits. 
You will also see any lint errors in the console.

#### Running unit tests

Run `yarn test` to execute the unit test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Running test coverage

Run `yarn test-cov` for a test coverage report in interactive watch mode.\
For more information please refer to the react [Coverage Reporting](https://create-react-app.dev/docs/running-tests/#coverage-reporting) documentation.

### Build

Run `yarn build` to build the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

Deploying the application requires having the `aws` and `terraform` cli commands installed on your machine. See the following links for OS specific installation instructions:

- [AWS CLI installation](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [Terraform installation](https://learn.hashicorp.com/tutorials/terraform/install-cli)

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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

If this project is being cloned to start a new project, there are a few things that need to be updated to make it work. The project name will need to be updated in the `README.md`, `package.json`, CircleCI `config.yml`. The README also refers to the boilerplate, both in the text and in the CircleCI badges.

The project `environment` files will need to be updated with the path to the APIs. The development `environment.dev.ts`  and `environment.prod.ts` files assumes a local development server of `http://localhost:3000`, which might need to be updated.

After provisioning and before deploying, the `deploy:staging` and `deploy:production` script in `package.json` needs to be updated.


### Prettier

This project uses Prettier to enforce code style. It is highly opinionated by design with relatively scant options for customization. The thought process behind it is to ignore personal styling preferences and instead embrace consistency. There are .prettierrc and .prettierignore configuration files to adjust some options. Prettier is also wired up to a pre-commit hook. This DOES slightly slow down git, as it runs the hook on staged files every time git commit is executed.

Prettier can be configured within editors so that it formats files on save, which helps minimize any changes the pre-commit hook would need to make.

### CI

This project is configured to work with CircleCI. CircleCI is a continuous integration and delivery platform for building and deploying your application.

The CI hanldes building the application, running tests, and running linters. All of these jobs must pass in order for the CI build to be successful.

This project has set up the CircleCI configuration [here](https://github.com/Shift3/boilerplate-client-react/blob/development/.circleci/config.yml). The project name needs to match the new project name for the builds to succeed.

It is recommended to use the above configuration, however if you choose to alter the configuration please visit the official CircleCI docs for guidance 'https://circleci.com/docs/2.0/config-intro/'.

#### Wiki Automation

The CircleCI config includes a `deploy-wiki` job to automatically deploy Wiki pages that are placed in the `wiki/` folder. This workflow only runs when changes are commited directly to the `development` branch or when a feature branch is merged into the `development` branch.

After forking the project, you will need to make the following changes to ensure the `deploy-wiki` job works properly:

1. Under the `deploy-wiki` job, change the `working_directory` to the name of your GitHub repository.
2. Follow the CircleCI documentaiton on [Creating a GitHub deploy key](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-deploy-key) to add a deploy key with write access, and replace the SSH key fingerprint in the `deploy-wiki` job.

These steps only need to be performed once by a user with admin access to both GitHub repository and CircleCI project.

### Webpack Bundle Analyzer

The project includes [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer), which helps developers figure out the size of the project and its webpack dependencies. To use it, type `yarn build` in the project's directory in a terminal to create the webpack bundle. Run `yarn run analyze`, and webpack-bundle-analyzer will launch a server and browser window with a visualization of the project bundle size.

### React Hook Form

We are using [React Hook Form](https://react-hook-form.com/) to extend our forms and make easy to work with validation.
for more information see: https://react-hook-form.com/ts for typescript support.


### Yup

Yup is a JavaScript object schema validator. With Yup, a developer can define a schema (or structure) which specifies the expected data type of each property in an object. The schema can also specify additional validations such as if a property is optional/required, the min/max length of string properties, the min/max value of numeric properties, a regular expressions to match, etc.

A Yup object schema is created using Yup's `object.shape()` method. For example, below is a simple schema describing a person object:

```javascript
import * as yup from 'yup';

const personSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
});
```

Once a schema has been defined, existing objects can be validated against the schema using the `isValid` or `isValidSync` methods defined on the schema object. `isValid` performs the validation asynchronously and returns the result in a `Promise` whereas `isValidSync` performs the validation synchronously and returns a `boolean`. For example:

```javascript
const validPerson = {
  name: 'John',
  age: 25,
};

const invalidPerson = {
  name: 'John',
  age: -25.5,
};

// validate asynchronously

personSchema.isValid(validPerson).then((valid) => {
  // valid === true
});

personSchema.isValid(invalidPerson).then((valid) => {
  // valid === false
});

// or synchronously

personSchema.isValidSync(validPerson); // => true

personSchema.isValidSync(invalidPerson)l // => false
```

For more information, see the [Yup documentation](https://github.com/jquense/yup).

#### resolvers

The `useForm` hook accepts an optional `resolver` function which allows you to use any external validation library such as [Yup](#yup) or your own custom validation logic to validate your forms. To simplify the integration with existing validation libraries, [React Hook Form](#react-hook-form) provides the optional `@hookform/resolvers` module which contains utility methods to create resolver functions from library specific object schemas.

For example, below we use the `yupResolver` from the `@hookform/resolvers` module to convert a [Yup](#yup) object schema into a resolver function:

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const personSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
});

const PersonForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register('name')} />
      <input type='number' {...register('age')} />
      <input type='submit' />
    </form>
  );
};
```

For more information, see the [useForm](https://react-hook-form.com/api/useform) and [@hookform/resolvers](https://github.com/react-hook-form/resolvers) documentation.

### Staging Build

### Additional Resources
