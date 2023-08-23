export const AgeCategoryNames = [
  "6-8",
  "8-10",
  "10-12",
  "12-14",
  "14-16",
  "16-19",
];

export enum AgeCategoryLevel {
  "easy" = 1,
  "medium",
  "hard",
  "bonus",
}

export type AgeCategory = {
  name: string;
  level: string;
};

export const CategoryNames = [
  "Interactions, système et société",
  "Communication et réseau",
  "Programme et matériel informatique",
  "Algorithmes et programmation",
  "Structures et représentations de données",
];

export const AlgoSubCategoryNames = [
  "Résoudre un problème avec des structures de données",
  "Force brute / méthode exhaustive",
  "Trier et chercher",
  "Structure de contrôle",
  "Problème d'optimisation",
  "Récursivité",
  "Binaire et opérations logiques",
  "Concept d'informatique",
  "Exécution d'instructions",
  "Algorithme spécifique",
  "Autre",
];

export type BebrasCategory = {
  category: string;
  sub_categories: string;
};

export type Task = {
  taskId: string;
  engTitle: string;
  dirPath: string;
  filePath: string;
  language: string;
  title: string;
  ageCategories: AgeCategory[];
  computer_science_areas: string[];
  computational_thinking_skills: string[];
  contributors: string[];
  bebrasCategories: BebrasCategory[];
  bebrasKeywords: string[];
};
