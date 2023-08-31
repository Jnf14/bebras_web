"use client";

import FilterMenu from "./FilterMenu";
import {
  AgeCategoryNames as AgeCategoryNames,
  CategoryNames,
  StruSubCategoryNames,
  YearCategoryNames,
} from "@/app/(types)/Task";
import { useSearchParams } from "next/navigation";
import { AlgoSubCategoryNames } from "@/app/(types)/Task";
import { FiFilter } from "react-icons/fi";

export default function SideBar() {
  const params = useSearchParams();
  return (
    <div className="h-full bg-white border-r-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center px-2 py-[9px] gap-2 border-b-2">
          <h1 className="font-semibold text-xl">Filtres</h1>
          <FiFilter size={20} />
        </div>
        <div className="border-b-2">
          <FilterMenu
            categoryName="Âges (ans)"
            subCategories={AgeCategoryNames}
            subcategorySearchKey="age"
          />
        </div>
        {/* <div className="border-b-2">
          <FilterMenu
            categoryName="Année"
            subCategories={YearCategoryNames}
            subcategorySearchKey="year"
            clickable
            categorySearchKey=""
          />
        </div> */}
        <FilterMenu
          categoryName={CategoryNames.algo}
          subCategories={AlgoSubCategoryNames}
          clickable
        />
        <FilterMenu
          categoryName={CategoryNames.stru}
          subCategories={StruSubCategoryNames}
          clickable
        />
        <FilterMenu categoryName={CategoryNames.netw} clickable />
        <FilterMenu categoryName={CategoryNames.inte} clickable />
        <FilterMenu categoryName={CategoryNames.proc} clickable />
      </div>
    </div>
  );
}
