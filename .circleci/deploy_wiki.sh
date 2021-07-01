#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

PROJECT_DIR=boilerplate-client-react
WIKI_DIR=boilerplate-client-react.wiki
GH_WIKI_REPO=https://github.com/Shift3/$WIKI_DIR.git

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
  git config --global user.name "CircleCI"
  git config --global user.email "boilerplate-client-react@bitwiseindustries.com"
  git add .
  git commit -m ""
  git push
fi
