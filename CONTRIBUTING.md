# Contributing

## How to cut a release from the develop branch to the main branch

**(Step 1)** Open the root directory of the react boilerplate via your terminal and ensure that you are on the develop branch.

**Recommendation:** Do this outside of your code editor.

**(Step 2)** Run `git flow` 

If you don't have Git Flow installed, use `brew install git-flow` to install it via brew.

**(Step 3)** Run `git flow init`

This will ask you a series of questions. You should use the defaults.

**(Step 4)** Run `git flow release start <new_version_number>`

You should define your new version number at the end, ex. 2.0.1.

**(Step 5)** Go to the `package.json` file and increase the version number so that it is consistent with the version number from the previous step.

**(Step 6)** Commit and push the edit that you made to `package.json` in the previous step.

**(Step 7)** Run `git flow release finish <release_name>`

The `release_name` is whatever you put for the version number in step 4. 

This command will open nano. You will need to use it in order to write and submit a commit message. After submitting the message, you will then need to write and submit a message for the commit's tag, ex. version 2.0.1 release.

After you submit the message for the tag, you will see a summary of actions.

**(Step 8)** Run `git push`

**(Step 9)** Run `git checkout main`

**(Step 10)** Run `git push`

**(Step 11)** Go to the React Boilerplate's main branch on GitHub and click on the yellow dot that's to the left of the commit hash. You will see that the CircleCI tests have started to run. Click on the Details link for the `ci/circle:ci test` check.

This will open up CircleCI. You will need to authorize CircleCI if you have never used it before. Ensure that all of the steps finish successfully.

**(Step 12)** Click on the deploy-production workflow and make sure that all of its steps finish successfully as well.

At the top of the page, you will see "Dashboard", "Project", Branch", "Workflow", and "Job". "deploy-production" should be under the Workflow column. Click on it.

**(Step 13)** Check the production website (https://boilerplate-client-react-prod.shift3sandbox.com/) and ensure that your changes are working as expected.
