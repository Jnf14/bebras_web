import { Task } from "@prisma/client";
import * as path from "path";
import * as util from "../app/libs/utils";
import prisma from "../app/libs/prismadb";

// Public path for tasks dataset
export const tasksDatasetPath: string = path.join(
  __dirname,
  "../tasks_dataset/"
);

/**
 * Get all tasks from Task collection
 */
export async function getAllTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({});
  return tasks;
}

/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export async function getTask(taskId: string): Promise<Task | null> {
  const task = await prisma.task.findUnique({
    where: { taskId: taskId },
  });
  return task;
}

/**
 * Insert a single task into the database
 * @param taskDirName the name of the directory containing the task
 */
export async function insertTask(taskDirName: string) {
  // Get task's metadata
  const taskMetadata = util.parseTaskMetadata(taskDirName);

  const ages = taskMetadata.ages as string[];

  // Upsert the task
  const task: Task = await prisma.task.create({
    data: {
      taskId: taskMetadata.taskId,
      engTitle: taskMetadata.engTitle,
      dirPath: taskMetadata.dirPath,
      filePath: taskMetadata.filePath,
      language: taskMetadata.language,
      title: taskMetadata.title,
      age_categories: {
        create: taskMetadata.ages,
      },
      computer_science_areas: taskMetadata.computer_science_areas,
      computational_thinking_skills: taskMetadata.computational_thinking_skills,
      contributors: taskMetadata.contributors,
      bebras_categories: {
        create: taskMetadata.bebras_categories,
      },
      bebras_keywords: taskMetadata.bebras_keywords,
    },
  });
}

/**
 * Insert all found tasks into the database
 */
export async function insertAllTasks() {
  const tasksDirectories: string[] = util.getTasksDirNames(tasksDatasetPath);
  tasksDirectories.forEach((dirName) => {
    insertTask(dirName);
  });
}
