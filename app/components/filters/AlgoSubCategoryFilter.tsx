"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Multiselect } from "multiselect-react-dropdown";
import { AlgoSubCategoryNames } from "@/app/types/Task";

export default function AlgoSubCategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const parsedParams = qs.parse(params.toString());
  //parsedParams;

  const currentState = AlgoSubCategoryNames.map((subCategory) => {
    return {
      name: subCategory,
      isChecked: params.getAll("algoCategories")?.includes(subCategory)
        ? true
        : false,
    };
  });

  let currentChosen: string[] = [];
  currentState.map((subCategory) => {
    if (subCategory.isChecked) {
      currentChosen.push(subCategory.name);
    }
  });

  const isActive: boolean = params
    .getAll("categories")
    ?.includes("Algorithmes et programmation")
    ? true
    : false;

  if (!isActive) {
    currentChosen = [];
    //handleToggle([])
  }

  function handleToggle(names: string[]) {
    const subCategories = currentState.map((row) => {
      return names.includes(row.name) ? row.name : undefined;
    });

    const query = {
      ...qs.parse(params.toString()),
      algoCategories: subCategories,
    };

    const url = qs.stringifyUrl(
      {
        url: "/tasks",
        query: query,
      },
      { skipNull: true }
    );
    router.push(url);
  }

  return (
    <Multiselect
      key={"mselectalgo"}
      options={AlgoSubCategoryNames}
      showCheckbox={false}
      onRemove={handleToggle}
      onSelect={handleToggle}
      isObject={false}
      selectedValues={currentChosen}
      disable={!isActive}
      placeholder="Sous catégories algo"
    />
  );
}
