# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

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

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Staging URL

<https://boilerplate-client-react.shift3sandbox.com/>

## Deployment

### Terraform

The AWS configuration **for the sandbox** is handled by Terraform. Terraform needs the AWS credentials which developers should already have or can access through Zoho Vault. The Terraform configuration is separated into modules for each cloud service it sets up.

Terraform also needs the project secrets saved in `terraform/terraform.tfvars` with the following structure:

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

### Local Environment

After provisioning the AWS instance through Terraform, the project environment variables need to be updated with the new server values.

The `apiRoute` property in `environment.staging.ts` will now need to be filled out with the provisioned sandbox instance.

The `package.json` file needs to be updated with the project name and sandbox S3 bucket: `"deploy:staging": "ng build --prod --configuration=staging && aws s3 sync ./dist/<PROJECT_DIRECTORY_PATH> s3://<AWS_SANDBOX_URL> --profile shift3 --delete"` Replace the brackets and placeholder values with the project values.

### AWS

Deploying to AWS requires having AWS credentials on the machine. The script is set to look for a default AWS profile named `shift3`. Once the AWS sandbox setup has been taken care of by Terraform, the deployment is done via `npm run deploy:staging`.

## Development

### Development Server
Run `yarn start` to start the development server listening on port 4200. You can view the app in the browser by navigating to `http://localhost:4200`. The app will automatically reload if any source files are changed.

### Docker
This project can be run as a Docker container (it is not recommended for involved development because it makes it harder to debug the codebase). Run `docker-compose up` to build and run the container. The app will be mapped to the port 4200 on your local machine and you can view the app in the browser by navigating to `http://localhost:4200`.