"use client";

import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import TaskKeyword from "./TaskKeyword";

interface TaskCardProps {
  task: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }: TaskCardProps) => {
  const router = useRouter();

  return (
    <div
      key={task.taskId}
      onClick={() => router.push(`/tasks/${task.taskId}`)}
      className="
        cursor-pointer 
        p-2
        my-1
        bg-white
        border
        border-gray-300 
        rounded-lg  
        hover:bg-gray-200 
        transition ease-out duration-500
        "
    >
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl text-slate-700">{task.title}</h2>
        <h3 className="font-light text-gray-700">{task.taskId}</h3>
      </div>

      <div className="mt-5 flex justify-end flex-wrap">
        {task.bebras_keywords?.map((keyword: string, i: number) => (
          <TaskKeyword keyword={keyword} key={i} />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
