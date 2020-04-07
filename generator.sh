#!/bin/bash

shopt -s dotglob
shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi

echo "Start to generate the project"

while true; do
  read -p "What is the application name? " application_name
  if [[ $application_name =~ ^[a-z]([-a-z0-9]*[a-z0-9])?$ ]]; then
    if [ ! -d "./$application_name" ]; then
      break
    else
      echo "Project $application_name has been created before"
    fi
  else
    echo "Application name is not valid"
  fi 
done

while true; do
  read -p "Application version? " application_version
  if [[ ! -z "$application_version" ]]; then
    break
  fi 
done

SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
while true; do
  read -p "Helm chart version (follows semver 2.x specification)? " helm_chart_version
  if [[ "$helm_chart_version" =~ $SEMVER_REGEX ]]; then
    break
  fi 
done

while true; do
  read -p "Docker registry? " docker_registry
  if [[ ! -z "$docker_registry" ]]; then
    break
  fi 
done

mkdir ./$application_name
cp -r ./scaffolds/* ./$application_name
mv ./$application_name/helm/\${application_name} ./$application_name/helm/${application_name}

sed "s/\${application_name}/${application_name}/g" ./$application_name/helm/$application_name/Chart.yaml
sed "s/\${helm_chart_version}/${helm_chart_version}/g" ./$application_name/helm/$application_name/Chart.yaml
sed "s/\${application_version}/${application_version}/g" ./$application_name/helm/$application_name/Chart.yaml
sed "s|\${registry}|${docker_registry}|g" ./$application_name/helm/$application_name/values.yaml
sed "s/\${image_name}/${application_name}/g" ./$application_name/helm/$application_name/values.yaml

echo -e "application_name=${application_name}\napplication_version=${application_version}\nhelm_chart_version=${helm_chart_version}\ndocker_registry=${docker_registry}" > ./$application_name/appconfig

echo "Project $application_name is created successfully!"
