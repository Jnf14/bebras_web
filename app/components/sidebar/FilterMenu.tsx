"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

interface FilterMenuProps {
  categoryName: string;
  options: string[];
  searchKey: string;
  isMultiSearch: boolean;
}

export default function FilterMenu({
  categoryName,
  options,
  searchKey,
  isMultiSearch,
}: FilterMenuProps) {
  const router = useRouter();
  const params = useSearchParams();

  const [hidden, setHidden] = useState(!params.getAll(searchKey));

  // Get current state in search params
  const currentState = options.map((option) => {
    return {
      name: option,
      isChecked: params.getAll(searchKey)?.includes(option) ? true : false,
    };
  });

  // On toggle function to handle changes in checked categories
  function onToggle(name: string) {
    const newCategories = currentState.map((s) => {
      return s.isChecked ? s.name : undefined;
    });

    const index = newCategories.indexOf(name);
    if (index > -1) {
      newCategories.splice(index, 1);
      if (!isMultiSearch) {
        name = "";
      }
    } else {
      newCategories.push(name);
    }

    const query = {
      ...qs.parse(params.toString()),
      [searchKey]: isMultiSearch ? newCategories : name,
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

  // Add on click effect on menu label
  useEffect(() => {
    const label = document.getElementById(`${categoryName}Label`);

    label?.addEventListener("click", () => {
      if (hidden) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    });
  });

  return (
    <div className="select-none">
      <div
        id={`${categoryName}Label`}
        className={`flex justify-start text-xl font-bold border-y-2 p-2 mb-2 hover:bg-gray-100 cursor-pointer ${
          hidden ? "text-gray-500" : "text-black"
        }`}
      >
        <h3>{categoryName}</h3>
      </div>
      <div className={hidden ? "hidden" : "block"}>
        {currentState.map((s) => (
          <div key={s.name} className="flex items-center pl-4">
            <input
              type="checkbox"
              className="h-5 w-5 text-indigo-600 cursor-pointer"
              checked={s.isChecked}
              onChange={(e) => {
                onToggle(s.name);
              }}
            />
            <label className="ml-3 text-base text-gray-600">{s.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
