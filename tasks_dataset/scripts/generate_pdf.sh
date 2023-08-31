# Converts bebras tasks to pdf
find . -name "20*-fra*.md" -execdir sh -c 'bebras convert pdf {} --output-file ../../public/tasks/pdfFiles/"${0%.*}".pdf' {} \;

# Delete all files with .json extension 
find . -name "20*.pdfmeta.json" -type f -delete