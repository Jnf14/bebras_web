"use client";

import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "../Button";

const SEARCH_KEY = "search";

export default function TaskListSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const currentSearch = params.get(SEARCH_KEY);
  if (currentSearch) {
    setSearchText(currentSearch);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      pushSearchParams();
    }
  }

  function pushSearchParams() {
    const query = {
      ...qs.parse(params.toString()),
      search: searchText,
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
    <div className="items-center flex justify-center">
      <div className="flex flex-row items-center gap-1">
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
          icon={AiOutlineSearch}
          iconSize="18"
          onClick={() => pushSearchParams()}
        />
      </div>
    </div>
  );
}
