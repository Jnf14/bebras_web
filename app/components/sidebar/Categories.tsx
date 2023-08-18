import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import AgeBox from "./AgeBox";

const AgeCategories = [
  {
    label: "6 à 8 ans",
    db: "6-8",
  },
  {
    label: "8 à 10 ans",
    db: "6-10",
  },
  {
    label: "10 à 12 ans",
    db: "10-12",
  },
  {
    label: "12 à 14 ans",
    db: "12-14",
  },
  {
    label: "14 à 16 ans",
    db: "14-16",
  },
  {
    label: "16 à 19 ans",
    db: "16-19",
  },
];

export default function Categories() {
  const params = useSearchParams();
  const ageCategories = params?.get("ageCategories");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {AgeCategories.map((item) => (
          <AgeBox
            label={item.label}
            db={item.db}
            selected={ageCategories?.includes(item.db)}
          />
        ))}
      </div>
    </Container>
  );
}
