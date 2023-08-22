"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { AgeCategoryNames } from "@/app/types/Task";
import AgeCategoryBox from "./AgeCategoryBox";

export default function AgeCategoriesFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const parsedParams = qs.parse(params.toString());
  //parsedParams;

  const currentState = AgeCategoryNames.map((a) => {
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
        url: "/",
        query: query,
      },
      { skipNull: true }
    );
    router.push(url);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Ages</h1>
      <ul>
        {currentState.map((s) => (
          <li key={s.name} className="text-lg mb-2">
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

// function WriteAgeList({
//   ages,
//   onToggle,
// }: {
//   ages: Age[];
//   onToggle: (ageID: number, nextCheck: boolean) => void;
// }) {
//   return (
//     <ul>
//       {ages.map((age) => (
//         <li key={age.id} className="text-lg mb-2">
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
//               checked={age.isChecked}
//               onChange={(e) => {
//                 onToggle(age.id, e.target.checked);
//               }}
//             />
//             {age.title}
//           </label>
//         </li>
//       ))}
//     </ul>
//   );
// }
