import os
import re
import ruamel.yaml
from ruamel.yaml.representer import RoundTripRepresenter

# Root directory
rootdir = './tasks_dataset'


def getFileMetadata(path: str):
    # Open and read file 
    file = open(path, 'r')
    content = file.read()
    
    # Search for start and end of YALM frontmatter
    yaml_start = content.find('---') + 3
    yaml_end = content[yaml_start:].rfind('\n---\n')
    yaml_content = content[yaml_start:yaml_end]

    # Add escape characters to *.svg line
    regex = r"\*.[^\n]*"

    yaml_content = re.sub(regex, lambda m: f'"{m.group(0)}"\n', yaml_content)

    yaml_dict = ruamel.yaml.safe_load(yaml_content)
    
    return yaml_dict

# Iterate through files in subdirectories
for subdir, dirs, filenames in os.walk(rootdir):
    for filename in filenames:
        # Keep only markdown filenames containing 'fra'
        if filename.endswith(".md") and 'fra' in filename:
            # Path to file 
            path = os.path.join(subdir, filename)
            print(path)

            metadata = getFileMetadata(path)
            print(metadata['id'])

            

