import * as fs from "fs";
import * as path from "path";
import { parse } from "yaml";
import { convert_html, convert_pdf, convert_tex } from "bebras";
import { Task } from "@/app/types/Task";

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
export function getTaskFileString(path: string): string {
  const file = fs.readFileSync(path).toString();
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

/**
 *
 * @param taskFilePath
 * @returns
 */
export function getTaskHtmlString(taskFilePath: string): string {
  const t_text = getTaskFileString(taskFilePath);
  const [htmContent, _] = convert_html.renderMarkdown(
    t_text,
    path.dirname(taskFilePath),
    true
  );
  return htmContent;
}

/**
 *
 * @param taskFilePath
 * @returns
 */
export function getTaskMdString(taskFilePath: string): string {
  return getTaskFileString(taskFilePath);
}

/**
 *
 * @param taskFilePath
 * @returns
 */
export function getTaskTexString(taskFilePath: string): string {
  const textMd = getTaskFileString(taskFilePath);
  const langCode = "fra";
  const [tokens, metadata] = convert_html.parseMarkdown(
    textMd,
    path.dirname(taskFilePath),
    {
      langCode,
      // we use ⍀ to avoid escaping \ to \\, and we later convert it back to \
      customQuotes: ["⍀enquote⦃", "⦄", "⍀enquote⦃", "⦄"],
    }
  );
  const linealizedTokens = tokens.flatMap((t) => {
    if (t.type === "inline") {
      return t.children ?? [];
    } else {
      return [t];
    }
  });

  const texDataStandalone = convert_tex.renderTex(
    linealizedTokens,
    langCode,
    metadata,
    taskFilePath,
    true
  );

  return texDataStandalone;
}

/**
 *
 * @param taskFilePath
 * @returns
 */
export async function getTaskPdfFile(taskFilePath: string): Promise<string> {
  const taskFileName = path.basename(taskFilePath);
  const outputFileName = await convert_pdf.convertTask_pdf(
    taskFilePath,
    taskFileName
  );

  return outputFileName;
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

// export function getDifficulty(difficulty: string): number {
//   switch (difficulty) {
//     case "bonus":
//       return 0;
//     case "hard":
//       return 1;
//     case "medium":
//       return 2;
//     case "easy":
//       return 3;
//     default:
//       return 4;
//   }
// }

// export function getLevelFromName(ageName: string, task: Task): number {
//   let difficulty = 0;
//   task.ageCategories.forEach((elem) => {
//     if (elem.name == ageName) {
//       difficulty = getDifficulty(elem.level);
//     }
//   });
//   return difficulty;
// }
