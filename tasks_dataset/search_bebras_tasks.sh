#! /bin/bash

# Find all folders which contain file matching 20*.md and copy them to this folder
find /path/to/task-dev -name "20*.md" -exec sh -c 'cp -Rp "${0%/*}" /path/to/this/folder' {} \;

# Delete all files with .odt extension 
find /path/to/this/folder -name "*.odt" -type f -delete

# Delete empty folders
find . -type d -empty -delete