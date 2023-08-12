import os
import re
import ruamel.yaml
import numpy as np
import matplotlib.pyplot as plt
import json

# Root directory
rootdir = '.'


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


number_of_files = 0
cs_areas_dict = {}
cs_skills_dict = {}
ages_dict = {
    '6-8': {'easy': 0, 'medium': 0, 'hard': 0},
    '8-10': {'easy': 0, 'medium': 0, 'hard': 0},
    '10-12': {'easy': 0, 'medium': 0, 'hard': 0},
    '12-14': {'easy': 0, 'medium': 0, 'hard': 0},
    '14-16': {'easy': 0, 'medium': 0, 'hard': 0},
    '16-19': {'easy': 0, 'medium': 0, 'hard': 0},
}

# Iterate through files in subdirectories
for subdir, dirs, filenames in os.walk(rootdir):
    for filename in filenames:
        # Keep only markdown filenames containing 'fra'
        if filename.endswith(".md") and 'fra' in filename:
            number_of_files += 1

            # Path to file 
            path = os.path.join(subdir, filename)

            # Read metadata
            metadata = getFileMetadata(path)

            # Read cs_areas
            for area in metadata.get('computer_science_areas', metadata.get('categories', [])):
                cs_areas_dict[area] = cs_areas_dict.get(area, 0) + 1

            # Read cs_skills
            for skill in metadata.get('computational_thinking_skills', []):
                cs_skills_dict[skill] = cs_skills_dict.get(skill, 0) + 1

            # Read ages
            ages = metadata.get('ages')
            for a in ages:
                level = ages[a]
                if level == 'bonus':
                    ages_dict[a]['hard'] += 1
                elif not '-' in level:
                    ages_dict[a][level] += 1

print('--------------------------')
print(number_of_files, 'files.')
print('---------CS_AREAS---------')
print(json.dumps(cs_areas_dict, indent=2))
print('---------CS_SKILLS--------')
print(json.dumps(cs_skills_dict, indent=2))
print('---------AGES--------')
print(json.dumps(ages_dict, indent=2))

fig1, areas = plt.subplots()

for area, count in cs_areas_dict.items():
    p = areas.barh(area, count, 0.6, label=count)
    areas.bar_label(p, label_type='center')

areas.set_title('Number of tasks per CS Area')
fig1.set_size_inches(8, 6)
plt.savefig('areas.png', bbox_inches='tight')   

fig2, skills = plt.subplots()

for skill, count in cs_skills_dict.items():
    p = skills.barh(skill, count, 0.6, label=count)

    skills.bar_label(p, label_type='center')

plt.xticks(rotation = 90)

skills.set_title('Number of tasks per CS Skills')

plt.savefig('skills.png',bbox_inches='tight')

