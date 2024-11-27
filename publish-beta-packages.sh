#!/bin/bash

# Ensure that an argument is provided
if [ -z "$1" ]; then
  echo "Error: Please provide a version argument."
  exit 1
fi

# Source the package order
source package-order.sh

# Loop through each package directory
for pkg in "${DIRS[@]}"; do
  # Get the package name from its package.json file
  pkg_name=$(jq -r '.name' $pkg/package.json)
  echo "Processing package: $pkg_name with version $1"

  # Change to the package directory
  if ! cd "$pkg"; then
    echo "Error: Unable to change to directory: $pkg"
    exit 1
  fi

  # Update the package version
  if ! yarn version "$1"; then
    echo "Error: Failed to update version for $pkg_name"
    exit 1
  fi

  # Build the package
  if ! yarn build; then
    echo "Error: Failed to build $pkg_name"
    exit 1
  fi

  # Publish the package with a "beta" tag
  if ! yarn npm publish --tag beta; then
    echo "Error: Failed to publish $pkg_name"
    exit 1
  fi

  # Change back to the root directory
  if ! cd - > /dev/null; then
    echo "Error: Unable to change back to original directory"
    exit 1
  fi

  echo "$pkg_name has been processed successfully."
done

echo "All packages processed."
