"use client";

import { useRouter } from "next/navigation";

import Button from "../Button";
import { Task } from "@/app/types/Task";

interface TaskListHeaderProps {
  tasks: Task[];
}

export default function TaskListHeader({ tasks }: TaskListHeaderProps) {
  const router = useRouter();

  return (
    <div>
      <div className="py-3 border-b-2 flex justify-between">
        <h3>{tasks.length} résultats</h3>
        <div>
          <Button
            label="Retirer les filtres"
            onClick={() => router.push("/tasks")}
            small
            outline
          />
        </div>
      </div>
    </div>
  );
}
