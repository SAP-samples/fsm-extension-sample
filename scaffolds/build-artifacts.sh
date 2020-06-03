#!/bin/bash
set -e

# see https://askubuntu.com/questions/1167287/parse-json-with-default-bash-only
function jsonValue() {
  KEY=$1
  num=$2
  awk -F"[,:}]" '{for(i=1;i<=NF;i++){if($i~/'$KEY'\042/){print $(i+1)}}}' | tr -d '"' | sed -n ${num}p
}

application_name=$(cat ./artifacts/appconfig.json | jsonValue name 1 | tr -d "[:blank:]")
application_version=$(cat ./artifacts/appconfig.json | jsonValue version 1 | tr -d "[:blank:]")
application_icon=$(cat ./artifacts/appconfig.json | jsonValue icon 1 | tr -d "[:blank:]")
application_description=$(cat ./artifacts/appconfig.json | jsonValue description 1 | tr -d "[:blank:]")
helm_chart_version=$(cat ./artifacts/appconfig.json | jsonValue helmChartVersion 1 | tr -d "[:blank:]")
docker_registry=$(cat ./artifacts/appconfig.json | jsonValue dockerRegistry 1 | tr -d "[:blank:]")

echo "Start to prepare deployments artifacts"

echo "==> docker build"
docker build -t $docker_registry/$application_name:$application_version .

echo "==> docker push"
docker push $docker_registry/$application_name:$application_version

echo "==> update versions in helm charts"
shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi
sed 's/version:.*/version: '${helm_chart_version}'/g' ./artifacts/helm/$application_name/Chart.yaml
sed 's/appVersion:.*/appVersion: '\"${application_version}\"'/g' ./artifacts/helm/$application_name/Chart.yaml
sed 's/icon:.*/icon: '${application_icon}'/g' ./artifacts/helm/$application_name/Chart.yaml
sed 's/description:.*/description: '${application_description}'/g' ./artifacts/helm/$application_name/Chart.yaml

# helm lint and render template are not mandatory
if which helm >/dev/null; then
  echo "==> helm lint"
  helm lint ./artifacts/helm/$application_name
  echo "==> helm render template"
  helm template ./artifacts/helm/$application_name
fi

echo "Deployments artifacts are generated successfully!"
