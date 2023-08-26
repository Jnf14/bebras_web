export const AgeCategoriesNames = [
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
  "Algorithmes et programmation",
  "Communication et réseau",
  "Interactions, système et société",
  "Programme et matériel informatique",
  "Structures et représentations de données",
];

export const AlgoSubCategoryNames = [
  "Algorithme spécifique",
  "Binaire et opérations logiques",
  "Concept d'informatique",
  "Résoudre un problème avec des structures de données",
  "Force brute / méthode exhaustive",
  "Trier et chercher",
  "Structure de contrôle",
  "Problème d'optimisation",
  "Récursivité",
  "Exécution d'instructions",
  "Autre",
];

export const StrucSubCategoryNames = [
  "Cryptographie",
  "Protection et sécurité des données",
  "Organisation et collecte des données",
  "Représentation de l'information et des données à l'aide de symboles",
  "Représentation et visualisation à l'aide de graphes et dessins",
  "Autre",
];

export type BebrasCategory = {
  category: string;
  sub_categories: string[];
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
