#!/bin/bash
# Define the order of the directories to process
source package-order.sh

# Loop over the directories and run the build command
for dir in "${DIRS[@]}"; do
    cd $dir
    npm run build
    cd -
done