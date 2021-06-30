#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

DOCS_DIR=docs
WIKI_REPO=https://github.com/Shift3/boilerplate-client-react.wiki.git
WIKI_DIR=wiki

git clone $WIKI_REPO $WIKI_DIR
cp $DOCS_DIR/*.md $WIKI_DIR

cd $WIKI_DIR
git checkout master
git config --global user.email "CircleCI"
git config --global user.name "CircleCI"
git add .
git commit -m "chore: update wiki pages"
git push
