"use client";

import { useRouter } from "next/navigation";
import { RxReset } from "react-icons/rx";
import Button from "../Button";
import { Task } from "@/app/types/Task";
import TaskListSort from "./TaskListSort";

interface TaskListHeaderProps {
  tasks: Task[];
}

export default function TaskListHeader({ tasks }: TaskListHeaderProps) {
  const router = useRouter();

  return (
    <div>
      <div className="py-3 border-b-2 flex flex-row items-center justify-between select-none">
        <div className="text-sm text-gray-500">
          <h3>{tasks.length} résultats</h3>
        </div>

        <div>
          <TaskListSort />
        </div>
        <div>
          <Button
            label="Réinitialiser"
            onClick={() => router.push("/tasks")}
            icon={RxReset}
          />
        </div>
      </div>
    </div>
  );
}
