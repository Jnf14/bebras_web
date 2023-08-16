"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyProps {
  title?: string;
  subtitle?: string;
  showButton?: boolean;
}

export default function Empty({
  title = "Pas de résultat",
  subtitle = "Essayez de retirer certains filtres",
  showButton,
}: EmptyProps) {
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
}
