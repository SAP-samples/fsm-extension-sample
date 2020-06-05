#!/bin/bash
set -e

shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi

application_name=$(cat ./artifacts/appconfig.json | jq ".name" | tr -d '"')
application_version=$(cat ./artifacts/appconfig.json | jq ".version" | tr -d '"')
application_icon=$(cat ./artifacts/appconfig.json | jq ".icon" | tr -d '"')
application_description=$(cat ./artifacts/appconfig.json | jq ".description" | tr -d '"')
helm_chart_version=$(cat ./artifacts/appconfig.json | jq ".helmChartVersion" | tr -d '"')
docker_registry=$(cat ./artifacts/appconfig.json | jq ".dockerRegistry" | tr -d '"')
parameters_arr=$(cat ./artifacts/appconfig.json | jq ".parameters | .[].name" | awk '{ print $1 }' | tr -d '"')

echo "Start to prepare deployments artifacts"

echo "==> docker build"
docker build -t $docker_registry/$application_name:$application_version .

echo "==> docker push"
docker push $docker_registry/$application_name:$application_version

echo "==> update versions in helm charts - Chart.yaml"
sed 's/version:.*/version: '${helm_chart_version}'/g' ./artifacts/helm/$application_name/Chart.yaml
sed 's/appVersion:.*/appVersion: '\"${application_version}\"'/g' ./artifacts/helm/$application_name/Chart.yaml
sed "s|icon:.*|icon: ${application_icon}|g" ./artifacts/helm/$application_name/Chart.yaml
sed "s|description:.*|description: ${application_description}|g" ./artifacts/helm/$application_name/Chart.yaml

echo "==> update deployment parameters into helm charts - values.yaml"
if [[ ! -z "$parameters_arr" ]]; then
  parameters_str=''
  for element in ${parameters_arr//\\n/ } ; do
    parameters_str="{\"name\":\"$element\",\"value\":\"\"},$parameters_str"
  done
  parameters_str="[${parameters_str:0:$((${#parameters_str}-1))}]"
  sed 's/parameters:.*/parameters: '${parameters_str}'/g' ./artifacts/helm/$application_name/values.yaml
else
  sed 's/parameters:.*/parameters: []/g' ./artifacts/helm/$application_name/values.yaml
fi

# helm lint and render template are not mandatory
if which helm >/dev/null; then
  echo "==> helm lint"
  helm lint ./artifacts/helm/$application_name
  echo "==> helm render template"
  helm template ./artifacts/helm/$application_name
fi

echo "Deployments artifacts are generated successfully!"
