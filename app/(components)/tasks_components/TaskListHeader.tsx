"use client";

import { useRouter } from "next/navigation";
import { RxReset } from "react-icons/rx";
import Button from "../Button";
import { Task } from "@/app/(types)/Task";
import TaskListSort from "./TaskListSort";
import TaskListSearch from "./TaskListSearch";

interface TaskListHeaderProps {
  tasks: Task[];
}

export default function TaskListHeader({ tasks }: TaskListHeaderProps) {
  const router = useRouter();

  return (
    <div className="px-2 py-2 border-b-2 flex flex-row items-center justify-between select-none">
      <div className="text-sm text-gray-500 flex flex-row items-center gap-1">
        <h3>{tasks.length} résultats</h3>
        {/* {params.size != 0 ? <h3> avec {params.size} filtres</h3> : <></>} */}
      </div>

      <div>
        <TaskListSearch />
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
  );
}
