// Task type for parsing and reuse
export type Task = {
  taskId: string;
  engTitle: string;
  dirPath: string;
  filePath: string;
  language: string;
  year: string;
  title: string;
  ageCategories: AgeCategory[];
  computer_science_areas: string[];
  computational_thinking_skills: string[];
  contributors: string[];
  bebrasCategories: BebrasCategory[];
  bebrasKeywords: string[];
};

export type AgeCategory = {
  age: string;
  level: string;
};

export type BebrasCategory = {
  category: string;
  sub_categories: string[];
};

export const SortTasksOptions = [
  {
    name: "A -> Z",
    key: "title",
  },
  {
    name: "Par année",
    key: "taskId",
  },
  {
    name: "Par difficulté ↓",
    key: "diff",
  },
  {
    name: "Par difficulté ↑",
    key: "diffdown",
  },
];

// Age categories options
export const AgeCategoryNames = [
  // "6-8",
  "8-10",
  "10-12",
  "12-14",
  "14-16",
  "16-19",
];

// Year categories options
export const YearCategoryNames = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

export enum AgeLevel {
  easy = 1,
  medium = 2,
  hard = 3,
  bonus = 4,
}

// Main categories
export const CategoryNames = {
  algo: "Algorithmes et programmation",
  netw: "Communication et réseau",
  inte: "Interactions, système et société",
  proc: "Processus et matériel informatique",
  stru: "Structures et représentations de données",
};

// Algorithms subcategories
export const AlgoSubCategoryNames = [
  "Théorie des graphes",
  "Récursivité",
  "Force brute",
  "Tri et recherche",
  "Optimisation",
  "Binaire et logique",
  "Exécution séquentielle",
  "Variables",
  "Structures de contrôle",
  "Autre",
];

// Structures subcategories
export const StruSubCategoryNames = [
  "Encodage de l'information",
  "Protection et sécurité",
  "Stockage et collecte",
  "Visualisation de l'information",
  "Autre",
];
