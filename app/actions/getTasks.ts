import { data } from "@/tasks_dataset/data";
import { Task } from "../types/Task";
import sortBy from "sort-by";
import { getDifficulty, getLevelFromName } from "../libs/utils";

export interface ISearchParams {
  ageCategories: string;
  categories: string[];
  algoCategories: string[];
  strucCategories: string[];
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks({
  ageCategories,
  categories,
  algoCategories,
  strucCategories,
}: ISearchParams): Task[] {
  let tasks: Task[];
  tasks = data as Task[];

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

    tasks.sort((a,b)=>{
      if(getLevelFromName(ageCategories,a)<getLevelFromName(ageCategories,b)){
        return -1
      }else{
        return 1
      }
    })
    
    // tasks = data.filter((task) => {
    //   const taskAgeCategories = task.ageCategories.map((cat) => cat.name);

    //   return taskAgeCategories.every((cat) => ageCategories.includes(cat));
    // });
  } else {
    //tasks = data as Task[];
  }
  if (categories) {
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

  if (algoCategories) {
    if (Array.isArray(algoCategories)) {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map(
          (c) => c.sub_categories[0]
        );
        return algoCategories.every((c) => taskSubCategories.includes(c));
      });
    } else {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map(
          (c) => c.sub_categories[0]
        );
        return new Array(algoCategories).every((c) =>
          taskSubCategories.includes(c)
        );
      });
    }
  }

  if (strucCategories) {
    if (Array.isArray(strucCategories)) {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map(
          (c) => c.sub_categories[0]
        );
        return strucCategories.every((c) => taskSubCategories.includes(c));
      });
    } else {
      tasks = tasks.filter((task) => {
        const taskSubCategories = task.bebrasCategories.map(
          (c) => c.sub_categories[0]
        );
        return new Array(strucCategories).every((c) =>
          taskSubCategories.includes(c)
        );
      });
    }
  }  

  return tasks;
}
