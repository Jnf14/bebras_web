"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const CATEGORY_SEARCH_KEY = "category";
const SUBCATEGORY_SEARCH_KEY = "subcategory";

interface FilterMenuProps {
  categoryName: string;
  subCategories?: string[];
  categorySearchKey?: string;
  subcategorySearchKey?: string;
  clickable?: boolean;
}

export default function FilterMenu({
  categoryName,
  subCategories,
  categorySearchKey = CATEGORY_SEARCH_KEY,
  subcategorySearchKey = SUBCATEGORY_SEARCH_KEY,
  clickable,
}: FilterMenuProps) {
  const router = useRouter();
  const params = useSearchParams();

  const isOpen = params.get(categorySearchKey) == categoryName || !clickable;

  // On toggle function to handle changes in checked categories
  function pushSearchParams(
    key: string,
    value: string,
    clear: boolean = false
  ) {
    const query = {
      ...qs.parse(params.toString()),
    };

    if (clear) {
      query[categorySearchKey] = "";
      query[subcategorySearchKey] = "";
    }

    if (params.get(key) == value) {
      query[key] = "";
    } else {
      query[key] = value;
    }

    const url = qs.stringifyUrl(
      {
        url: "/tasks/",
        query: query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }

  // Add on click effect on menu label
  useEffect(() => {
    const label = document.getElementById(`${categoryName}Label`);

    label?.addEventListener("click", () => {
      if (clickable) {
        pushSearchParams(categorySearchKey, categoryName, true);
      }
    });
  });

  return (
    <div className="select-none ml-2 mb-2">
      <div
        id={`${categoryName}Label`}
        className={`flex justify-between text-lg px-2 py-3 rounded-sm leading-none
        ${isOpen ? "text-black font-semibold" : "text-gray-900 font-medium"} ${
          isOpen && clickable
            ? " border-l-[6px] border-thunderbird-700 bg-neutral-100"
            : ""
        }
           ${clickable ? "hover:bg-neutral-100 cursor-pointer" : ""}`}
      >
        <h3>{categoryName}</h3>

        <div className="flex flex-row items-center justify-end">
          {subCategories &&
            clickable &&
            (isOpen ? <BiMinus size={20} /> : <BiPlus size={20} />)}
        </div>
      </div>
      <div className={isOpen ? "block" : "hidden"}>
        <div className="flex flex-col">
          {subCategories?.map((subCat) => (
            <div
              key={subCat}
              className={`mx-6 pl-2 py-1 mt-1 hover:bg-neutral-100 rounded-sm cursor-pointer ${
                params.get(subcategorySearchKey) === subCat
                  ? "bg-neutral-100 border-l-4 border-thunderbird-700 font-medium"
                  : "bg-white font-normal"
              }`}
            >
              <div
                className=" leading-none"
                onClick={() => pushSearchParams(subcategorySearchKey, subCat)}
              >
                <h1>{subCat}</h1>
              </div>
              {/* <label
                className={`w-full text-base cursor-pointer flex flex-row items-center gap-2 hover:bg-neutral-100 rounded-md px-3 ${
                  params.get(subcategorySearchKey) === subCat
                    ? "text-gray-800 font-semibold bg-neutral-100"
                    : "text-gray-500"
                }`}
              >
                <input
                  type="checkbox"
                  className="appearance-none w-4 h-4 border-2 rounded-full bg-white shrink-0 checked:bg-thunderbird-700 checked:border-gray-400"
                  checked={
                    params.get(subcategorySearchKey) === subCat ? true : false
                  }
                  onChange={(e) => {
                    pushSearchParams(subcategorySearchKey, subCat);
                  }}
                />
                <div
                  className={`${
                    params.get(subcategorySearchKey) === subCat
                      ? "border-l-2 border-thunderbird-700"
                      : false
                  }`}
                >
                  {subCat}
                </div>
              </label> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
