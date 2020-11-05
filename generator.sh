#!/bin/bash
set -e

shopt -s dotglob
shopt -s expand_aliases

if [[ "$OSTYPE" == "darwin"* ]]; then
  alias sed='sed -i ""'
else
  alias sed='sed -i""'
fi

function promptyn() {
  while true; do
    read -p "$1 " yn
    case $yn in
    [Yy]*) return 0 ;;
    [Nn]*) return 1 ;;
    *) echo "Please answer yes or no." ;;
    esac
  done
}

echo "Start to generate the project"

while true; do
  read -p "Application name? " application_name
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
read -p "Application description? " application_description
read -p "Application icon (a URL to an SVG or PNG image to be used as an icon)? " application_icon
read -p "Application provider? " application_provider
while true; do
  read -p "Application version? " application_version
  if [[ ! -z "$application_version" ]]; then
    break
  fi
done


if promptyn "Do you want to use SSO authentication for your extension (y/n) "; then
  useSSO=true
  useShellSDK=true
else
  useSSO=false

  if promptyn "Do you want to use the Shell SDK for your extension (y/n) "; then
    useShellSDK=true
  else
    useShellSDK=false
  fi
fi


mkdir ./$application_name
mkdir ./$application_name/artifacts

if promptyn "Do you want to ship the application with Helm Chart? [required when using fsm-extension-installer-kyma] (y/n) "; then
  SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
  while true; do
    read -p "Helm chart version (ex. 1.0.0, follow semver 2.x specification at https://semver.org/)? " helm_chart_version
    if [[ "$helm_chart_version" =~ $SEMVER_REGEX ]]; then
      break
    else
      echo "Helm chart version is not valid"
    fi
  done

  while true; do
    read -p "Docker registry (ex. docker.io/{your docker ID})? " docker_registry
    if [[ ! -z "$docker_registry" ]]; then
      break
    fi
  done

  # Create project folder structure
  cp -r ./scaffolds/* ./$application_name

  if [ "$useSSO" = true ] ; then
    rm -rf ./$application_name/src
    mv ./$application_name/src-openid-auth-code-flow ./$application_name/src
  else
    cp -r ./scaffolds/* ./$application_name
    rm -rf ./$application_name/src-openid-auth-code-flow
    if [ "$useShellSDK" = true ] ; then
      rm ./$application_name/src/frontend/indexNoSDK.html
    else
      rm ./$application_name/src/frontend/index.html
      mv ./$application_name/src/frontend/indexNoSDK.html ./$application_name/src/frontend/index.html
    fi
  fi

  mv ./$application_name/src/README.md ./$application_name

  mv ./$application_name/helm ./$application_name/artifacts/helm
  mv ./$application_name/artifacts/helm/\${application_name} ./$application_name/artifacts/helm/${application_name}
  # Update Chart.yaml and values.yaml with initial inputs from user
  sed "s/\${application_name}/${application_name}/g" ./$application_name/artifacts/helm/$application_name/Chart.yaml
  # see https://stackoverflow.com/questions/46104856/replacing-a-url-with-sed-that-contains-ampersands
  tmp_application_icon=`printf "%q" "$application_icon"`
  sed "s|\${application_icon}|${tmp_application_icon}|g" ./$application_name/artifacts/helm/$application_name/Chart.yaml
  sed "s|\${application_description}|${application_description//\&/\\\&}|g" ./$application_name/artifacts/helm/$application_name/Chart.yaml
  sed "s/\${application_version}/${application_version}/g" ./$application_name/artifacts/helm/$application_name/Chart.yaml
  sed "s/\${helm_chart_version}/${helm_chart_version}/g" ./$application_name/artifacts/helm/$application_name/Chart.yaml
  sed "s|\${registry}|${docker_registry}|g" ./$application_name/artifacts/helm/$application_name/values.yaml
  sed "s/\${image_name}/${application_name}/g" ./$application_name/artifacts/helm/$application_name/values.yaml

  # Write appconfig.json
  jq -n '{name:$application_name, provider:$application_provider, description:$application_description, version:$application_version, icon:$application_icon, useShellSDK:$useShellSDK | test("true"), dockerRegistry:$docker_registry, helmChartVersion:$helm_chart_version, parameters:[], outletPositions:[]}' \
    --arg application_name "$application_name" \
    --arg application_provider "$application_provider" \
    --arg application_description "$application_description" \
    --arg application_version "$application_version" \
    --arg application_icon "$application_icon" \
    --arg docker_registry "$docker_registry" \
    --arg helm_chart_version "$helm_chart_version" > ./$application_name/artifacts/appconfig.json \
    --arg useShellSDK $useShellSDK
else
  # Create project folder structure
  rsync -r -p --exclude 'helm' --exclude 'build-charts.sh' ./scaffolds/* ./$application_name

  if [ "$useSSO" = true ] ; then
    rm -rf ./$application_name/src
    mv ./$application_name/src-openid-auth-code-flow ./$application_name/src
  else
    cp -r ./scaffolds/* ./$application_name
    rm -rf ./$application_name/src-openid-auth-code-flow
    if [ "$useShellSDK" = true ] ; then
      rm ./$application_name/src/frontend/indexNoSDK.html
    else
      rm ./$application_name/src/frontend/index.html
      mv ./$application_name/src/frontend/indexNoSDK.html ./$application_name/src/frontend/index.html
    fi
  fi

  mv ./$application_name/src/README.md ./$application_name

  # Write appconfig.json
  jq -n '{name:$application_name, provider:$application_provider, description:$application_description, version:$application_version, icon:$application_icon, useShellSDK:$useShellSDK | test("true"), parameters:[], outletPositions:[]}' \
    --arg application_name "$application_name" \
    --arg application_provider "$application_provider" \
    --arg application_description "$application_description" \
    --arg application_version "$application_version" \
    --arg application_icon "$application_icon" > ./$application_name/artifacts/appconfig.json \
    --arg useShellSDK $useShellSDK
fi

echo "Project $application_name is created successfully!"
