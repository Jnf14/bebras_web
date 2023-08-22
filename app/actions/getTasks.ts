import { data } from "@/tasks_dataset/data";
import { Task } from "../types/Task";
import { isArray } from "bebras/out/util";

export interface ISearchParams {
  ageCategories: string[];
  categories: string[];
  algoCategories: string[]
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks(params: ISearchParams): Task[] {
  const { ageCategories, categories, algoCategories} = params;

  console.log(ageCategories);
  console.log(categories);

  let tasks: Task[];
  tasks = data as Task[]
  if (ageCategories) {
    if (Array.isArray(ageCategories)) {
      tasks = tasks.filter((task) => {
        const taskAges = task.ageCategories.map((c) => c.name);
        return ageCategories.every((c) => taskAges.includes(c));
      });
    } else {
      tasks = tasks.filter((task) => {
        const taskAges = task.ageCategories.map((c) => c.name);
        return new Array(ageCategories).every((c) => taskAges.includes(c));
      });
    }

    // tasks = data.filter((task) => {
    //   const taskAgeCategories = task.ageCategories.map((cat) => cat.name);

    //   return taskAgeCategories.every((cat) => ageCategories.includes(cat));
    // });
  } else {
    //tasks = data as Task[];
  }
  if (categories){
    if (Array.isArray(categories)) {
      tasks = tasks.filter((task) => {
        const taskCategories = task.bebrasCategories.map((c) => c.category);
        return categories.every((c) => taskCategories.includes(c));
      });
    } else {
      tasks = tasks.filter((task) => {
        const taskCategories = task.bebrasCategories.map((c) => c.category);
        return new Array(categories).every((c) => taskCategories.includes(c));
      });
    }
  }

  if (algoCategories){
    if (Array.isArray(algoCategories)) {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map((c) => c.sub_categories);
        return algoCategories.every((c)=>taskSubCategories[0].includes(c))
      });
    } else {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map((c) => c.sub_categories);
        return new Array(algoCategories).every((c) => taskSubCategories[0].includes(c));
      });
    }
  }

  console.log(tasks.length);
  return tasks;
}
