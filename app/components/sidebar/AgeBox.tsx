import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface AgeBoxProps {
  label: string;
  db: string;
  selected?: boolean;
}

export default function AgeBox({ label, db }: AgeBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    let newQuery: any = {};
    if (params?.get("ageCategorie")?.includes(db)) {
    }

    const updatedQuery: any = {
      ...currentQuery,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          ageCategories: ["8-10"],
        },
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);
}
