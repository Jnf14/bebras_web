// "use client";
// import qs from "query-string";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
// import { useCallback, useState } from "react";
// import Button from "../Button";

// export interface Age {
//   id: number;
//   title: string;
//   isChecked: boolean;
// }

// const ageList: Age[] = [
//   { id: 0, title: "8-10ans", isChecked: false },
//   { id: 1, title: "10-12ans", isChecked: false },
//   { id: 2, title: "12-14ans", isChecked: false },
//   { id: 3, title: "14-16ans", isChecked: false },
//   { id: 4, title: "16-19ans", isChecked: false },
// ];

// export default function AgeFilter() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const [ages, setMyAge] = useState(ageList);

//   const handleClick = useCallback(() => {
//     let currentQuery = {};

//     if (params) {
//       currentQuery = qs.parse(params.toString());
//     }

//     const updatedQuery: any = {
//       ...currentQuery,
//     };

//     for (let age in ageList) {
//     }

//     const url = qs.stringifyUrl(
//       {
//         url: "/",
//         query: {
//           ageCategories: ["8-10"],
//         },
//       },
//       { skipNull: true }
//     );

//     router.push(url);
//   }, [router, params]);

//   // function handleToggleAges(ageID: number, nextCheck: boolean) {
//   //   // setMyAge(
//   //   //   ages.map((age) => {
//   //   //     if (age.id == ageID) {
//   //   //       return { ...age, isChecked: nextCheck };
//   //   //     } else {
//   //   //       return age;
//   //   //     }
//   //   //   })
//   //   // );
//   // }
//   return (
//     <>
//       <h1 className="text-3xl font-bold">Ages</h1>
//       {/* <WriteAgeList ages={ages} onToggle={handleToggleAges} /> */}
//       <Button label="Test" onClick={handleClick} />
//     </>
//   );
// }

// // function WriteAgeList({
// //   ages,
// //   onToggle,
// // }: {
// //   ages: Age[];
// //   onToggle: (ageID: number, nextCheck: boolean) => void;
// // }) {
// //   return (
// //     // <ul>
// //     //   {ages.map((age) => (
// //     //     <li key={age.id} className="text-lg mb-2">
// //     //       <label className="flex items-center space-x-2">
// //     //         <input
// //     //           type="checkbox"
// //     //           className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
// //     //           checked={age.isChecked}
// //     //           onChange={(e) => {
// //     //             handleClick()
// //     //           }}
// //     //         />
// //     //         {age.title}
// //     //       </label>
// //     //     </li>
// //     //   ))}
// //     // </ul>
// //   // );
// // }

"use client";
import { useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import next from "next/types";

export interface Age {
  id: number;
  title: string;
  isChecked: boolean;
}

const ageList: Age[] = [
  { id: 0, title: "8-10", isChecked: false },
  { id: 1, title: "10-12", isChecked: false },
  { id: 2, title: "12-14", isChecked: false },
  { id: 3, title: "14-16", isChecked: false },
  { id: 4, title: "16-19", isChecked: false },
];

export default function AgeFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const initialAges = ageList.map((age) => ({
    ...age,
    isChecked: params.get("ages") === age.title,
  }));

  const [ages, setAges] = useState(initialAges);

  function handleToggleAges(ageID: number, nextCheck: boolean) {
    const updatedAges = ages.map((age) =>
      age.id === ageID
        ? { ...age, isChecked: nextCheck }
        : { ...age, isChecked: false }
    );

    const selectedAge = updatedAges.find((age) => age.id === ageID);

    const updatedQuery = {
      ...qs.parse(params.toString()),
      ages: selectedAge?.isChecked ? selectedAge.title : undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    setAges(updatedAges);
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Ages</h1>
      <WriteAgeList ages={ages} onToggle={handleToggleAges} />
    </>
  );
}

function WriteAgeList({
  ages,
  onToggle,
}: {
  ages: Age[];
  onToggle: (ageID: number, nextCheck: boolean) => void;
}) {
  return (
    <ul>
      {ages.map((age) => (
        <li key={age.id} className="text-lg mb-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
              checked={age.isChecked}
              onChange={(e) => {
                onToggle(age.id, e.target.checked);
              }}
            />
            {age.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
