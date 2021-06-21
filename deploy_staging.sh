#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

BUILD_DIRECTORY_PATH=
AWS_SANDBOX_URL=

yarn run predeploy:staging

aws s3 sync $BUILD_DIRECTORY_PATH s3://$AWS_SANDBOX_URL --profile shift3 --delete