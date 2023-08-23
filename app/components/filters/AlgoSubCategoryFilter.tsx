"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { Multiselect } from "multiselect-react-dropdown";
import { AlgoSubCategoryNames } from "@/app/types/Task";


export default function AlgoSubCategoryFilter(){


  const router = useRouter();
  const params = useSearchParams();

  const parsedParams = qs.parse(params.toString());
  //parsedParams;

  const currentState = AlgoSubCategoryNames.map((subCategory) => {
    return {
      name: subCategory,
      isChecked: params.getAll("algoCategories")?.includes(subCategory) ? true : false,
    };
  });

  const currentChosen: string[] = []
    currentState.map((subCategory)=>{
    if(subCategory.isChecked){
        currentChosen.push(subCategory.name)
    }
  })

  const isActive:boolean = params.getAll("categories")?.includes("Algorithmes et programmation")?true : false;
  
  function handleToggle(names: string[]) {
    let name : string[]
    if (names.length>currentChosen.length){
        name=names.filter(item=>currentChosen.indexOf(item)<0)
    }else{
        name=currentChosen.filter(item=>names.indexOf(item)<0)
    }
    
    const subCategories = currentState.map((s) => {
      return s.isChecked ? s.name : undefined;
    });

    const index = subCategories.indexOf(name[0]);
    if (index > -1) {
      subCategories.splice(index, 1);
    } else {
      subCategories.push(name[0]);
    }

    const query = {
      ...qs.parse(params.toString()),
      algoCategories: subCategories,
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
        options={AlgoSubCategoryNames}
        showCheckbox={false} 
        onRemove={handleToggle} 
        onSelect={handleToggle} 
        isObject={false} 
        selectedValues={currentChosen} 
        disable={!isActive}
        placeholder="Sous catégories"/>
    )
}