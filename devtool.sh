#!/bin/bash
. ./appconfig

shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi

echo "======replace name and version in package.json======"
sed 's/\"name\":.*/\"name\": '\"${application_name}\",'/g' ./package.json
sed 's/\"version\":.*/\"version\": '\"${application_version}\",'/g' ./package.json

echo "======docker build=================================="
docker build -t $docker_registry/$application_name:$application_version .

echo "======docker push==================================="
docker push $docker_registry/$application_name:$application_version

echo "======copy helm charts from template================"
if [ ! -d "./helm/$application_name" ]; then
  mkdir ./helm/$application_name
  cp -r ./helm/fsm-extension-sample/* ./helm/$application_name
fi
sed 's/name:.*/name: '${application_name}'/g' ./helm/$application_name/Chart.yaml
sed 's/version:.*/version: '${helm_chart_version}'/g' ./helm/$application_name/Chart.yaml
sed 's/appVersion:.*/appVersion: '${application_version}'/g' ./helm/$application_name/Chart.yaml
sed 's|docker_registry:.*|docker_registry: '${docker_registry}'|g' ./helm/$application_name/values.yaml
sed 's/docker_image_name:.*/docker_image_name: '${application_name}'/g' ./helm/$application_name/values.yaml

# helm lint and render template is not mandatory
if which helm >/dev/null; then
    echo "======helm lint====================================="
    helm lint ./helm/$application_name
    echo "======helm render template=========================="
    helm template ./helm/$application_name
fi
