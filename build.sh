#!/bin/bash
# Loop through each package directory
# Define the order of the directories to process
source package-order.sh

# Loop over the directories and run the build command
for dir in "${DIRS[@]}"; do
  # Change to the directory
  if ! cd "$dir"; then
    echo "Error: Unable to change to directory: packages/$dir"
    exit 1
  fi

  # Run the build command
  if ! yarn build; then
    echo "Error: Failed to run 'yarn build' in directory: packages/$dir"
    exit 1
  fi

  # Change back to the original directory
  if ! cd - > /dev/null; then
    echo "Error: Unable to change back to original directory"
    exit 1
  fi
done
