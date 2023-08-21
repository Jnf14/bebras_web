import { data } from "@/tasks_dataset/data";
import { Task } from "../types/Task";
import { isArray } from "bebras/out/util";

export interface ISearchParams {
  ageCategories: string[];
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks(params: ISearchParams): Task[] {
  const { ageCategories } = params;

  console.log(ageCategories);

  let tasks: Task[];
  if (ageCategories) {
    if (Array.isArray(ageCategories)) {
      tasks = data.filter((task) => {
        const taskAges = task.ageCategories.map((c) => c.name);
        return ageCategories.every((c) => taskAges.includes(c));
      });
    } else {
      tasks = data.filter((task) => {
        const taskAges = task.ageCategories.map((c) => c.name);
        return new Array(ageCategories).every((c) => taskAges.includes(c));
      });
    }

    // tasks = data.filter((task) => {
    //   const taskAgeCategories = task.ageCategories.map((cat) => cat.name);

    //   return taskAgeCategories.every((cat) => ageCategories.includes(cat));
    // });
  } else {
    tasks = data as Task[];
  }

  console.log(tasks.length);
  return tasks;
}
