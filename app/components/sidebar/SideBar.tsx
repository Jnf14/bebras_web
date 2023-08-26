"use client";

import { useEffect } from "react";
import AlgoSubCategoryFilter from "../filters/AlgoSubCategoryFilter";
import CategoriesFilter from "../filters/CategoryFilter";
import StrucSubCategoryFilter from "../filters/StrucSubCategoryFilter";
import Logo from "../navbar/Logo";
import AgeCategoriesFilter from "./AgeCategoriesFilter";
import FilterMenu from "./FilterMenu";
import { AgeCategoriesNames } from "@/app/types/Task";

export default function SideBar() {
  return (
    <div className="h-full bg-white">
      <div className="flex flex-col space-y-4 border-r-2">
        <FilterMenu
          categoryName="Âges"
          options={AgeCategoriesNames}
          searchKey="ageCategories"
        />

        <CategoriesFilter />

        <AlgoSubCategoryFilter />

        <StrucSubCategoryFilter />
      </div>
    </div>
  );
}
