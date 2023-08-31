echo Starting PDFs generation...

# Converts bebras tasks to pdf
find ./tasks_dataset/ -name "20*-fra*.md" -execdir sh -c 'bebras convert pdf {} --output-file ../../public/tasks/pdfFiles/"${0%.*}".pdf' {} \;

# Delete all files with .json extension 
find ./tasks_dataset/ -name "20*.pdfmeta.json" -type f -delete

echo Ended PDFs generation.