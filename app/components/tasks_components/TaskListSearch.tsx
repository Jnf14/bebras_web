"use client";

import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsGearWideConnected } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Button from "../Button";

const SEARCH_KEY = "search";

export default function TaskListSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const currentSearch = params.get(SEARCH_KEY);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (currentSearch) {
      setSearchText(currentSearch);
    } else {
      setSearchText("");
    }
  });

  console.log(currentSearch);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      pushSearchParams(searchText);
    }
  }

  function pushSearchParams(value: string) {
    const query = {
      ...qs.parse(params.toString()),
      search: value,
    };

    const url = qs.stringifyUrl(
      {
        url: "/tasks/",
        query: query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }

  return (
    <div className="items-center flex justify-center">
      <div className="flex flex-row items-center gap-1">
        {currentSearch ? (
          <Button
            label=""
            icon={RxCross2}
            iconSize="16"
            onClick={() => {
              pushSearchParams("");
            }}
          />
        ) : (
          <></>
        )}
        <input
          type="text"
          className="block p-1 w-52 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300"
          placeholder="Titre, mot-clé..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={searchText}
        />
        <Button
          label=""
          icon={params.get("h") == "b" ? BsGearWideConnected : AiOutlineSearch}
          iconSize="18"
          onClick={() => pushSearchParams(searchText)}
        />
      </div>
    </div>
  );
}
