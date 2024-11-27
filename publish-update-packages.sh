#!/bin/bash
source package-order.sh

# Loop through each package directory
for pkg in "${DIRS[@]}"; do
  pkg_name=$(jq -r '.name' $pkg/package.json)
  current_version=$(jq -r '.version' $pkg/package.json)
  remote_version=$(yarn npm info $pkg_name --fields version --json 2>/dev/null | jq -r '.version')

  # Change to the directory
  if ! cd "$pkg"; then
    echo "Error: Unable to change to directory: packages/$pkg"
    exit 1
  fi

  # Run the build command
  if ! yarn build; then
    echo "Error: Failed to run 'yarn build' in directory: packages/$pkg"
    exit 1
  fi

  # Check if the package exists remotely or if the version has changed
  if [ -z "$remote_version" ] || [ "$current_version" != "$remote_version" ]; then
    if [ -z "$remote_version" ]; then
      echo "Package $pkg_name not found in registry. Deploying for the first time."
    else
      echo "Detected version change in $pkg: $remote_version -> $current_version"
    fi

    # Run the publish command
    if ! yarn npm publish --access public; then
      echo "Error: Failed to run 'yarn npm publish --access public' in directory: packages/$pkg"
      exit 1
    fi

  else
    echo "No version change detected in $pkg"
  fi

  # Change back to the original directory
  if ! cd - > /dev/null; then
    echo "Error: Unable to change back to original directory"
    exit 1
  fi
done
