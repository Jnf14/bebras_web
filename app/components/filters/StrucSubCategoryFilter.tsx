"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Multiselect } from "multiselect-react-dropdown";
import { StrucSubCategoryNames } from "@/app/types/Task";

export default function StrucSubCategoryFilter(){
    const router = useRouter();
  const params = useSearchParams();

  const parsedParams = qs.parse(params.toString());
  //parsedParams;

  const currentState = StrucSubCategoryNames.map((subCategory) => {
    return {
      name: subCategory,
      isChecked: params.getAll("strucCategories")?.includes(subCategory) ? true : false,
    };
  });

  let currentChosen: string[] = []
    currentState.map((subCategory)=>{
    if(subCategory.isChecked){
        currentChosen.push(subCategory.name)
    }
  })

  const isActive:boolean = params.getAll("categories")?.includes("Structures et représentations de données")?true : false;

  if(!isActive){
    currentChosen=[]
    //handleToggle([])
  }

  function handleToggle(names: string[]) {
    
    const subCategories = currentState.map((row) => {
      return names.includes(row.name) ? row.name : undefined;
    });

    const query = {
      ...qs.parse(params.toString()),
      strucCategories: subCategories,
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
  return(
    <Multiselect 
    key={"mselectstruc"}
    options={StrucSubCategoryNames}
    showCheckbox={false} 
    onRemove={handleToggle} 
    onSelect={handleToggle} 
    isObject={false} 
    selectedValues={currentChosen} 
    disable={!isActive}
    placeholder="Sous catégories struc"/>
)
}