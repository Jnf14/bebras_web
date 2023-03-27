#! /bin/bash

# Converts bebras tasks to html (without graphics !!)
#find . -name "20*.md" -execdir sh -c 'bebras convert html {} --output-file ../html_tasks/"${0%.*}".html' {} \;


# Converts bebras tasks to pdf
find . -name "20*.md" -execdir sh -c 'bebras convert pdf {} --output-file ../pdf_tasks/"${0%.*}".pdf' {} \;