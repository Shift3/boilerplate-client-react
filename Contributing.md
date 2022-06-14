## Contributing

### How to cut a release from the develop branch to the main branch

1. Open the root directory of the react boilerplate via your terminal and ensure that you are on the develop branch.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Recommendation:** Do this outside of your code editor.

2. Run `git flow` 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If you don't have Git Flow installed, use `brew install git-flow` to install it via brew.

3. Run `git flow init`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This will ask you a series of questions. You should use the defaults.

4. Run `git flow release < new version number >`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You should define your new version number at the end, ex. 2.0.1.

5. Go to the `package.json` file and increase the version number so that it is consistent with the version number from the previous step.

6. Commit and push the edit that you made to `package.json` in the previous step.

7. Run `git flow release finish ...`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This will open nano. You will need to first write and submit a commit message. After submitting the message, you will also need to write and submit a message for a tag, ex. version 2.0.1 release.

8. You will see a summary of actions.

9. Run `git push`

10. Run `git checkout main`

11. Run `git push`

12. Go to the React Boilerplate's main branch on GitHub and click on the yellow dot that's to the left of the commit hash. You will see that the CircleCI tests have started to run. Click on the Details link for the `ci/circle:ci test` check.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This will open up CircleCI. You will need to authorize CircleCI if you have never used it before. Ensure that all of the steps finish successfully.

13. Click on the deploy-production workflow and make sure that all of its steps finish successfully as well.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; At the top of the page, you will see "Dashboard", "Project", Branch", "Workflow", and "Job". "deploy-production" should be under the Workflow column. Click on it.

14. Check the production website (https://boilerplate-client-react-prod.shift3sandbox.com/) and ensure that your changes are working as you would expect.
