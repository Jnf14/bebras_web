import { data } from "@/tasks_dataset/data";
import { Task } from "../types/Task";

export interface IParams {
  taskId?: string;
}
/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export default async function getTaskById(params: IParams) {
  const { taskId } = params;

  const task: Task = data.filter((t) => {
    t.taskId == taskId;
  })[0];

  return task;
}
