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
  bebrasCategories?: BebrasCategory[];
  bebrasKeywords?: string[];
};
