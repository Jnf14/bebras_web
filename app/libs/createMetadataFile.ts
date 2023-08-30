import fs from "fs-extra";
import { copyAllGraphics, getTasksDirNames, parseTaskMetadata } from "./utils";
import path from "path";

// Path to tasks dataset
export const tasksDatasetPath: string = path.join(
  __dirname,
  "../../tasks_dataset/"
);

// Path to the public directory
export const publicDirPath: string = path.join(__dirname, "../../public/tasks");

const data: any = [];

const taskDirs = getTasksDirNames(tasksDatasetPath);
taskDirs.forEach((dir) => {
  // Get task's metadata
  const taskMetadata = parseTaskMetadata(dir);
  data.push(taskMetadata);
});

const contenuFichier = `\
// Ce fichier a été généré automatiquement
import { Task } from "@/app/types/Task";

export const data: Task[]= ${JSON.stringify(data, null, 2)};
`;

fs.writeFile("tasks_dataset/data.ts", contenuFichier, (err) => {
  if (err) {
    console.error("Une erreur est survenue :", err);
  } else {
    console.log("Le fichier data.ts a été généré avec succès.");
  }
});

copyAllGraphics(tasksDatasetPath, publicDirPath);
