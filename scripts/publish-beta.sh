#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Error: Please provide a package version argument" 1>&2
  exit 1
fi

pkg_name="@poap-xyz/poap-sdk"
pkg_version=$(echo "$1" | cut -d '@' -f2)

if [[ "$pkg_version" != *beta* ]]; then
  echo "Error: Please provide a package BETA version" 1>&2
  exit 1
fi

echo "New BETA package $pkg_name@$pkg_version.."

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

echo "$pkg_name@$pkg_version published"
