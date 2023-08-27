import { data } from "@/tasks_dataset/data";
import { SortTasksOptions, Task } from "../types/Task";
import sortBy from "sort-by";
import { getLevelFromName } from "../libs/utils";

export interface ISearchParams {
  ageCategories: string;
  categories: string[];
  algoCategories: string;
  strucCategories: string;
  sort: string;
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks({
  ageCategories,
  categories,
  algoCategories,
  strucCategories,
  sort = SortTasksOptions[0].key,
}: ISearchParams): Task[] {
  let tasks: Task[];
  tasks = data as Task[];

  // Filter by age category
  if (ageCategories) {
    tasks = tasks.filter((task) => {
      const taskAges = task.ageCategories.map((c) => c.name);
      return new Array(ageCategories).every((c) => taskAges.includes(c));
    });
  }

  // Filter by bebras categories
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

  // Filter by algo sub category
  if (algoCategories) {
    tasks = tasks.filter((task) => {
      const taskSubCategories = task.bebrasCategories.map(
        (c) => c.sub_categories[0]
      );
      return new Array(algoCategories).every((c) =>
        taskSubCategories.includes(c)
      );
    });
  }

  // Filter by struc sub category
  if (strucCategories) {
    tasks = tasks.filter((task) => {
      const taskSubCategories = task.bebrasCategories.map(
        (c) => c.sub_categories[0]
      );
      return new Array(strucCategories).every((c) =>
        taskSubCategories.includes(c)
      );
    });
  }

  // Handle sorting
  if (sort == SortTasksOptions[2].key) {
    // Sort tasks by age level
    tasks.sort((a, b) => {
      if (
        getLevelFromName(ageCategories, a) > getLevelFromName(ageCategories, b)
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    tasks.sort(sortBy(sort));
  }

  return tasks;
}
