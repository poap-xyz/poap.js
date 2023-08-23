#!/bin/bash
source package-order.sh

# Loop through each package directory
for pkg in "${DIRS[@]}"; do
  pkg_name=$(jq -r '.name' $pkg/package.json)
  current_version=$(jq -r '.version' $pkg/package.json)
  remote_version=$(npm view $pkg_name version 2>/dev/null)

  

  if ! npm version $1; then
    echo "Error: Failed to run 'npm version' in directory: packages/$pkg"
    exit 1
  fi

  # Run the build command
  if ! npm run build; then
    echo "Error: Failed to run 'npm run build' in directory: packages/$pkg"
    exit 1
  fi

  # Run the publish command
  if ! npm publish --access public --tag beta; then
    echo "Error: Failed to run 'npm publish --access public' in directory: packages/$pkg"
    exit 1
  fi

  # Change back to the original directory
  if ! cd - > /dev/null; then
    echo "Error: Unable to change back to original directory"
    exit 1
  fi
done
