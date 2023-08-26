import { data } from "@/tasks_dataset/data";
import { Task } from "../types/Task";

/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export default function getTaskById(taskId: string) {
  const task: Task = data.filter((t) => {
    return t.taskId === taskId;
  })[0];

  return task;
}
