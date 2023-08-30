import { data } from "@/tasks_dataset/data";
import { AgeLevel, SortTasksOptions, Task } from "../types/Task";
import sortBy from "sort-by";

export interface ISearchParams {
  age: string;
  category: string;
  subcategory: string;
  sort: string;
  search: string;
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks({
  age,
  category,
  subcategory,
  sort = SortTasksOptions[0].key,
  search,
}: ISearchParams): Task[] {
  // All tasks
  let tasks: Task[] = data;

  // Filter tasks by age
  if (age) {
    tasks = tasks.filter((task) => {
      return task.ageCategories.find((cat) => cat.age === age);
    });
  }

  // Filter tasks by category and subcategory
  if (category) {
    tasks = tasks.filter((task) => {
      const matching = task.bebrasCategories.find(
        (cat) => cat.category === category
      );

      if (!matching) {
        return false;
      }

      if (subcategory) {
        return matching.sub_categories.includes(subcategory);
      }

      return true;
    });
  }

  // Filter tasks using the search bar
  if (search) {
    const searchText = search.toLowerCase().trim();
    tasks = tasks.filter((task) => {
      const taskString = `${task.title} ${task.bebrasKeywords.join(" ")}`;
      return taskString.toLowerCase().includes(searchText);
    });
  }

  // Sort tasks
  if (sort == SortTasksOptions[2].key) {
    // Sort tasks by age level
    tasks.sort((a, b) => {
      const catA = a.ageCategories.find((cat) => cat.age === age);
      const catB = b.ageCategories.find((cat) => cat.age === age);

      if (catA && catB) {
        const levelA = AgeLevel[catA.level as keyof typeof AgeLevel];
        const levelB = AgeLevel[catB.level as keyof typeof AgeLevel];
        return levelA > levelB ? 1 : -1;
      } else {
        return 1;
      }
    });
  } else {
    tasks.sort(sortBy(sort));
  }

  return tasks;
}
