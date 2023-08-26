"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryNames } from "@/app/types/Task";
import CategoryBox from "./CategoryBox";

export default function CategoriesFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const parsedParams = qs.parse(params.toString());

  const currentState = CategoryNames.map((category) => {
    return {
      name: category,
      isChecked: params.getAll("categories")?.includes(category) ? true : false,
    };
  });

  function handleToggle(name: string) {
    const categories = currentState.map((s) => {
      return s.isChecked ? s.name : undefined;
    });

    const index = categories.indexOf(name);
    if (index > -1) {
      categories.splice(index, 1);
    } else {
      categories.push(name);
    }

    let algoSubParams = params.getAll("algoCategories");
    let strucSubParams = params.getAll("strucCategories");

    /**
     * If Algo & prog is not active, we must remove his subcategories from the query
     */
    if (!categories.includes("Algorithmes et programmation")) {
      algoSubParams = [];
    }
    /**
     * If Struc & repr is not active, we must remove his subcategories from the query
     */
    if (!categories.includes("Structures et représentations de données")) {
      strucSubParams = [];
    }

    const query = {
      ...qs.parse(params.toString()),
      categories: categories,
      algoCategories: algoSubParams,
      strucCategories: strucSubParams,
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
    <>
      <h1 className="text-xl font-bold">Catégories</h1>
      <ul>
        {currentState.map((s) => (
          <li key={s.name} className="mb-2">
            <CategoryBox
              name={s.name}
              isChecked={s.isChecked}
              onToggle={handleToggle}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
