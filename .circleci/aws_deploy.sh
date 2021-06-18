#!/usr/bin/env bash

set -x
set -o errexit
set -o pipefail
set -o nounset

AppVersion=$(sed -n 's/"version": "\(.*\)".*/\1/p' package.json | xargs echo -n);
EBEnvironment="boilerplate-server-node-policy-test";
DockerRepository="008036621198.dkr.ecr.us-west-2.amazonaws.com";
Profile="shift3Super";
ProjectName="boilerplate-client-react";
Region="us-west-2";

ECRDeploymentOutput=$DockerRepository/$ProjectName:v$AppVersion;

$(sed "s|<ecr-repository-link>/<ecr-repository-name>:v<project-version-number>|$ECRDeploymentOutput|g" Dockerrun.example.aws.json > Dockerrun.aws.json);

echo Building and pushing version $ProjectName:v$AppVersion to ECR using profile $Profile ...;

npm run build;

aws ecr get-login-password --region $Region --profile $Profile | docker login --username AWS --password-stdin 008036621198.dkr.ecr.us-west-2.amazonaws.com;

docker build -t $ProjectName . -f ./Dockerfile.prod;

docker tag $ProjectName:latest $DockerRepository/$ProjectName:v$AppVersion;

docker push $DockerRepository/$ProjectName:v$AppVersion;

eb deploy $EBEnvironment --profile $Profile;