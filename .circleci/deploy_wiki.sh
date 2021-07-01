#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

PROJECT_DIR=boilerplate-client-react
WIKI_DIR=boilerplate-client-react.wiki
GH_WIKI_REPO=https://github.com/Shift3/$WIKI_DIR.git

# CircleCI sets the $CIRCLE_SHA1 environement variable to the sha1 hash of the last commit.
# Using this hash, we can prase out the commit message and author info.
GIT_LAST_COMMIT_MESSAGE=\"$(git log --format=%B -n 1 $CIRCLE_SHA1)\"
GIT_LAST_COMMIT_AUTHOR_NAME=\"$(git log --format=%an -n 1 $CIRCLE_SHA1)\"
GIT_LAST_COMMIT_AUTHOR_EMAIL=\"$(git log --format=%ae -n 1 $CIRCLE_SHA1)\"

# Change out of the project directory and clone the wiki repo
cd ..
git clone $GH_WIKI_REPO

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

