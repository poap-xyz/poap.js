#!/bin/bash
# Given an argument like `<package-name>@v0.0.0-beta-0` will publish the
# package to NPM registry with the given version marked as beta.

if [ -z "$1" ]; then
  echo "Error: Please provide a package and version argument" 1>&2
  exit 1
fi

if [[ "$1" != *@* ]]; then
  echo "Error: Please provide a package name before the version" 1>&2
  exit 1
fi

pkg_name=$(echo "$1" | cut -d '@' -f1)
pkg_version=$(echo "$1" | cut -d '@' -f2)

echo "New BETA package $pkg_name@$pkg_version.."

if [ -z "$pkg_name" ]; then
  echo "Error: Please provide a package name" 1>&2
  exit 1
fi

if ! cd "packages/$pkg_name" 1>/dev/null 2>/dev/null; then
  echo "Error: Package $pkg_name not found" 1>&2
  exit 1
fi

echo
echo "Updating $pkg_name to version $pkg_version.."
if ! yarn version "$pkg_version"; then
  echo "Error: Failed to update version for $pkg_name@$pkg_version" 1>&2
  exit 1
fi

echo
echo "Building package $pkg_name@$pkg_version.."
if ! yarn build; then
  echo "Error: Failed to build $pkg_name@$pkg_version" 1>&2
  exit 1
fi

echo
echo "Publishing package $pkg_name@$pkg_version.."
if ! yarn npm publish --tag beta --access public; then
  echo "Error: Failed to publish $pkg_name@$pkg_version" 1>&2
  exit 1
fi

if ! cd - 1>/dev/null 2>/dev/null; then
  echo "Error: Unable to change back to original directory" 1>&2
  exit 1
fi

echo "$pkg_name@$pkg_version published"
