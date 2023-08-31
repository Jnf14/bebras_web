"use client";

import { useEffect } from "react";
import Heading from "./components/Heading";
import Button from "./components/Button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Heading
        title="Uh Oh"
        subtitle="Quelque chose s'est mal passé !"
        center
      />
      <Button outline label="Réessayer" onClick={() => reset()} />
    </div>
  );
}
