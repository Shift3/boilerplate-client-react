#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

# CircleCI sets the $CIRCLE_REPOSITORY_URL environement variable to the repo url
# in the format git@github.com:Shift3/<REPO NAME>:.git. We can use the sed command
# to extract the REPO NAME using the solution from the following StackOverflow answer
# https://stackoverflow.com/questions/9786498/expr-awk-sed-get-git-directory-name-from-repo-url
GITHUB_REPO_NAME="$(echo $CIRCLE_REPOSITORY_URL | sed 's%^.*/\([^/]*\)\.git$%\1%g')"
GITHUB_WIKI_REPO_URL=https://github.com/Shift3/$GITHUB_REPO_NAME.wiki.git
PROJECT_DIR=$GITHUB_REPO_NAME
WIKI_DIR=$PROJECT_DIR/../$GITHUB_REPO_NAME.wiki

# CircleCI sets the $CIRCLE_SHA1 environement variable to the sha1 hash of the last commit.
# Using this hash, we can prase out the commit message and author info from the git log.
# This code was adapted from solutions posted in the following forum post
# https://discuss.circleci.com/t/git-commit-message-in-environment-variable/533
GIT_LAST_COMMIT_MESSAGE=\"$(git log --format=%B -n 1 $CIRCLE_SHA1)\"
GIT_LAST_COMMIT_AUTHOR_NAME=\"$(git log --format=%an -n 1 $CIRCLE_SHA1)\"
GIT_LAST_COMMIT_AUTHOR_EMAIL=\"$(git log --format=%ae -n 1 $CIRCLE_SHA1)\"

# Change out of the project directory and clone the wiki repo
cd ..
git clone $GITHUB_WIKI_REPO_URL

# Update wiki repository with documentation folder contents
cp -rf $PROJECT_DIR/docs/* $WIKI_DIR/

# Switch into wiki repository
cd $WIKI_DIR

# Terminate CI build if no changes detected to wiki repo
if git diff-index --quiet HEAD && [ ! -n "$(git status -s)" ]; then 
  set +e 
  pkill -9 -P $$ &> /dev/null || true 
  exit 0
else
# Otherwise, push changes to master branch of wiki repo
  git config --global user.name $GIT_LAST_COMMIT_AUTHOR_NAME
  git config --global user.email $GIT_LAST_COMMIT_AUTHOR_EMAIL
  git add .
  git commit -m $GIT_LAST_COMMIT_MESSAGE
  git push
fi
