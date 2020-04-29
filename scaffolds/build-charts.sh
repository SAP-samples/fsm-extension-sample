#!/bin/bash
. ./appconfig

shopt -s dotglob
shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi

echo "Start to prepare deployments artifacts"

if [ ! -d ".git" ]; then
  echo "======git init======================================"
  git init
fi

echo "======docker build=================================="
docker build -t $docker_registry/$application_name:$application_version .
if [ $? -ne 0 ]; then
  echo "docker build fails"
  exit 1
fi

echo "======docker push==================================="
docker push $docker_registry/$application_name:$application_version
if [ $? -ne 0 ]; then
  echo "docker push fails"
  exit 1
fi

echo "======update versions in helm charts================"
sed 's/version:.*/version: '${helm_chart_version}'/g' ./helm/$application_name/Chart.yaml
sed 's/appVersion:.*/appVersion: '\"${application_version}\"'/g' ./helm/$application_name/Chart.yaml

# helm lint and render template are not mandatory
if which helm >/dev/null; then
  echo "======helm lint====================================="
  helm lint ./helm/$application_name
  echo "======helm render template=========================="
  helm template ./helm/$application_name
fi

echo "Deployments artifacts are generated successfully!"