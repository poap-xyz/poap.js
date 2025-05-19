#!/bin/bash
# Build all packages.

workspace_root="$(dirname "${0}")/.."
source "${workspace_root}/workspace.sh"

for pkg_name in "${workspace[@]}"; do
  if ! cd "${workspace_root}/packages/$pkg_name" 1>/dev/null 2>/dev/null; then
    echo "Error: Package $pkg_name not found" 1>&2
    exit 1
  fi

  echo
  echo "Building package $pkg_name.."
  if ! yarn build; then
    echo "Error: Failed to build $pkg_name" 1>&2
    exit 1
  fi

  if ! cd - 1>/dev/null 2>/dev/null; then
    echo "Error: Unable to change back to original directory" 1>&2
    exit 1
  fi
done
