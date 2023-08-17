"use client";
import getTasks, { ISearchParams } from "@/app/actions/getTasks";
import { useState } from 'react';

export interface Age {
  id: number,
  title: string,
  isChecked: boolean
}


const ageList : Age[] = [
  { id: 0, title: '8-10ans', isChecked: false },
  { id: 1, title: '10-12ans', isChecked: false },
  { id: 2, title: '12-14ans', isChecked: false },
  { id: 3, title: '14-16ans', isChecked: false },
  { id: 4, title: '16-19ans', isChecked: false }
]

export default function AgeFilter() {
  const [ages, setMyAge] = useState(ageList);

  function handleToggleAges(ageID: number, nextCheck: boolean) {
    setMyAge(ages.map(age=>{
      if(age.id ==ageID){
        return {...age, isChecked: nextCheck}
      }else{
        return age
      }
    }))
  }
  return (
    <>
      <h1 className="text-3xl font-bold">Ages</h1>
      <WriteAgeList
        ages={ages}
        onToggle={handleToggleAges} />
    </>
  );
}

function WriteAgeList({ages, onToggle}: {ages: Age[], onToggle:(ageID: number, nextCheck: boolean) => void }) {
  return (
    <ul>
      {ages.map(age => (
        <li key={age.id} className="text-lg mb-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 cursor-pointer"
              checked={age.isChecked}
              onChange={e => {
                onToggle(
                  age.id,
                  e.target.checked
                );
              }}
            />
            {age.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
