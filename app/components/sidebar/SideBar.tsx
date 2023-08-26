"use client";

import FilterMenu from "./FilterMenu";
import {
  AgeCategoriesNames as AgeCategoryNames,
  CategoryNames,
  StrucSubCategoryNames,
} from "@/app/types/Task";
import { useSearchParams } from "next/navigation";
import { AlgoSubCategoryNames } from "@/app/types/Task";

export default function SideBar() {
  const params = useSearchParams();
  return (
    <div className="h-full bg-white border-r-2">
      <div className="flex flex-col space-y-4 ">
        <FilterMenu
          categoryName="Âges"
          options={AgeCategoryNames}
          searchKey="ageCategories"
        />
        <FilterMenu
          categoryName="Catégories"
          options={CategoryNames}
          searchKey="categories"
        />
        {params
          .getAll("categories")
          .includes("Algorithmes et programmation") ? (
          <FilterMenu
            categoryName="Sous catégories algorithmes"
            options={AlgoSubCategoryNames}
            searchKey="algoCategories"
          />
        ) : (
          <></>
        )}
        {params
          .getAll("categories")
          .includes("Structures et représentations de données") ? (
          <FilterMenu
            categoryName="Sous catégories structures"
            options={StrucSubCategoryNames}
            searchKey="strucCategories"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
