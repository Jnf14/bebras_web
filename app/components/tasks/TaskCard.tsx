"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TaskKeyword from "./TaskKeyword";
import { Task } from "@/app/types/Task";

const NUM_OF_KEYWORDS = 3;

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get task's keywords
  const keywords = task.bebrasKeywords?.slice(0, NUM_OF_KEYWORDS);

  // Get current age categories
  const ageCats = searchParams.getAll("ageCategories");

  return (
    <div
      key={task.taskId}
      onClick={() => router.push(`/tasks/${task.taskId}`)}
      className="cursor-pointer p-2 my-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 transition ease-out duration-500"
    >
      <div className="flex justify-between ">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl text-slate-700">{task.title}</h2>
          {/* <h3 className="font-light text-gray-700">{task.taskId}</h3> */}
        </div>

        <div className="w-1/3 mt-5 flex justify-end flex-wrap">
          {keywords.map((keyword: string, i: number) => (
            <TaskKeyword keyword={keyword} key={i} />
          ))}
        </div>
      </div>
      <ul>
        {task.ageCategories
          .filter((cat) => ageCats.includes(cat.name))
          .map((cat) => (
            <li>
              <h3>{cat.name}</h3>
              <h3>{cat.level}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskCard;
