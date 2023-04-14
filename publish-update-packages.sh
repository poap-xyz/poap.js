#!/bin/bash
source package-order.sh

# Loop through each package directory
for dir in "${DIRS[@]}"; do
  pkg_name=$(jq -r '.name' $pkg/package.json)
  current_version=$(jq -r '.version' $pkg/package.json)
  remote_version=$(npm view $pkg_name version 2>/dev/null)

  # Check if the package exists remotely or if the version has changed
  if [ -z "$remote_version" ] || [ "$current_version" != "$remote_version" ]; then
    if [ -z "$remote_version" ]; then
      echo "Package $pkg_name not found in registry. Deploying for the first time."
    else
      echo "Detected version change in $pkg: $remote_version -> $current_version"
    fi

    cd $pkg
    npm run build
    # Publish the package with npm
    npm publish --access public
    cd -
  else
    echo "No version change detected in $pkg"
  fi
done
