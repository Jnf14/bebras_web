"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { AgeCategoriesNames } from "@/app/types/Task";
import AgeCategoryBox from "./AgeCategoryBox";

export default function AgeCategoriesFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const currentState = AgeCategoriesNames.map((a) => {
    return {
      name: a,
      isChecked: params.getAll("ageCategories")?.includes(a) ? true : false,
    };
  });

  function handleToggle(name: string) {
    const ageCategories = currentState.map((s) => {
      return s.isChecked ? s.name : undefined;
    });

    const index = ageCategories.indexOf(name);
    if (index > -1) {
      ageCategories.splice(index, 1);
    } else {
      ageCategories.push(name);
    }

    const query = {
      ...qs.parse(params.toString()),
      ageCategories: ageCategories,
    };

    const url = qs.stringifyUrl(
      {
        url: "/tasks/",
        query: query,
      },
      { skipNull: true }
    );
    router.push(url);
  }

  return (
    <>
      <ul>
        {currentState.map((s) => (
          <li key={s.name}>
            <AgeCategoryBox
              name={s.name}
              isChecked={s.isChecked}
              onToggle={handleToggle}
            />
          </li>
        ))}
      </ul>
      {/* <WriteAgeList ages={age} onToggle={handleToggleAges} /> */}
    </>
  );
}
