#!/bin/bash

# Loop through each package directory
for pkg in $(find packages/* -maxdepth 0 -type d); do
  cd $pkg
  npm run build
  cd -
done
