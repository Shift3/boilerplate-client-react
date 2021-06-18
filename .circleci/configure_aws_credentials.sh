#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

sudo apt install awscli
pip install awsebcli --upgrade --user
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default_region $AWS_DEFAULT_REGION
cp .circleci/aws_config ~/.aws/config
npm i yarn --user
npm i rimraf --user