import * as fs from "fs";
import * as path from "path";
import { parse } from "yaml";

/**
 * Returns the names of all directories containing tasks
 * @warning The metadata must be in the correct format
 * (only two occurrences of "---")
 * @param datasetPath
 * @returns
 */
export function getTasksDirNames(datasetPath: string): string[] {
  return fs
    .readdirSync(datasetPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .filter((name) => name.startsWith("20"));
}

/**
 * Returns the read file as a string given its path
 * @param path the relative path to the file
 * @returns the file as a string
 */
export async function getTaskFileString(path: string): Promise<string> {
  const file = await fs.promises.readFile(path, "utf-8");
  return file;
}

/**
 * Parses the task's metadata matching prisma schema
 * @param taskDirName
 * @param taskLanguage
 * @returns
 */
export function parseTaskMetadata(
  taskDirName: string,
  taskLanguage = "fra"
): any {
  // Get task info in task directory name
  const taskId = taskDirName.split("_")[0] + "-" + taskLanguage;
  const taskEngTitle = taskDirName.split("_").slice(1).join(" ");
  const taskDirPath = path.join("tasks_dataset", taskDirName);
  const taskFilePath = path.join(taskDirPath, taskId + ".task.md");

  // Read file
  const file: string = fs.readFileSync(taskFilePath).toString();

  // Take only YAML string
  const firstDelimiter = file.indexOf("---");
  const secondDelimiter = file.indexOf("---", firstDelimiter + 3);
  const yamlString: string = file
    .substring(firstDelimiter + 3, secondDelimiter)
    .replaceAll("*", "");

  // Parse YAML string into dictionary
  const yaml = parse(yamlString);

  // Parse and format task ages categories
  const ages = Object.entries<String>(yaml.ages)
    .filter(([_, v]) => v != null && v.indexOf("-") == -1)
    .map(([k, v]) => ({ age: k, level: v }));

  // Parse and format task ages field
  const bebrasCategories = yaml.bebras_categories
    ? Object.entries(yaml.bebras_categories).map(([k, v]) => ({
        category: k,
        sub_categories: v,
      }))
    : undefined;

  // Construct task metadata
  const taskMetadata = {
    taskId: taskId,
    engTitle: taskEngTitle,
    dirPath: taskDirPath,
    filePath: taskFilePath,
    language: taskLanguage,
    year: taskId.split("-")[0],
    title: yaml.title,
    ageCategories: ages,
    computer_science_areas: yaml.computer_science_areas
      ? yaml.computer_science_areas
      : yaml.categories,
    computational_thinking_skills: yaml.computational_thinking_skills
      ? yaml.computational_thinking_skills
      : [],
    contributors: yaml.contributors ? yaml.contributors : [],
    bebrasCategories: bebrasCategories,
    bebrasKeywords: yaml.bebras_keywords ? yaml.bebras_keywords : undefined,
  };

  return taskMetadata;
}

export function copyAllGraphics(datasetPath: string, destPath: string) {
  const graphics: string[] = findFilesByExtension(datasetPath, ".svg");
  let ignored: number = 0;
  let copied: number = 0;

  graphics.forEach((filePath) => {
    const fileName: string = path.basename(filePath);
    const dirName: string = path.basename(path.dirname(filePath));
    const dest: string = path.join(destPath, dirName, fileName);

    try {
      fs.copyFileSync(filePath, dest);
      copied++;
    } catch (error) {
      ignored++;
    }
  });

  console.log(
    `${copied} fichiers (${ignored} ignorés) ont été copiés vers ${destPath} .\n`
  );
}

/**
 * Recursive function which finds all files of a given extension in a dir
 */
export function findFilesByExtension(
  dirPath: string,
  extension: string,
  files: string[] = [],
  res: string[] = [],
  regex: any = undefined
) {
  files = files.length === 0 ? fs.readdirSync(dirPath) : files;
  regex = regex || new RegExp(`\\${extension}$`);

  for (let i = 0; i < files.length; i++) {
    const file = path.join(dirPath, files[i]);
    if (fs.statSync(file).isDirectory() && !path.extname(file)) {
      try {
        res = findFilesByExtension(
          file,
          extension,
          fs.readdirSync(file),
          res,
          regex
        );
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        res.push(file);
      }
    }
  }
  return res;
}
