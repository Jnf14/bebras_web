"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showButton?: boolean;
}

const Empty: React.FC<EmptyProps> = ({
  title = "Pas de résultat",
  subtitle = "Essayez de changer ou retirer certains de vos filtres",
  showButton,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[80vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showButton && (
          <Button
            outline
            label="Retirer tous les filtres"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default Empty;
