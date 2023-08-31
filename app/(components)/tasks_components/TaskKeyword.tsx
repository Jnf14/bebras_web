"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface TaskKeywordProp {
  keyword: string;
  color?: string;
}

const TaskCard: React.FC<TaskKeywordProp> = ({ keyword, color }) => {
  const router = useRouter();
  const params = useSearchParams();

  function pushSearchParams(searchText: string) {
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
    <span
      onClick={(e) => {
        e.stopPropagation();
        pushSearchParams(keyword);
      }}
      className="inline-block whitespace-nowrap bg-blue-100 font-light text-cyan-600 text-sm rounded-lg mb-1 mr-1 p-1 text-center leading-none cursor-pointer border border-transparent hover:border-cyan-600"
    >
      {keyword}
    </span>
  );
};

export default TaskCard;
