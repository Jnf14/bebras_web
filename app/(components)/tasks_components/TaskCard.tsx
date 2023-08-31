"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TaskKeyword from "./TaskKeyword";
import { Task } from "@/app/(types)/Task";
import TaskLevel from "./TaskLevel";

const NUM_OF_KEYWORDS = 3;

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get task's keywords
  const keywords = task.bebrasKeywords?.slice(0, NUM_OF_KEYWORDS);

  // Get current age
  const age = searchParams.get("age")!;
  const taskAgeCat = task.ageCategories.find((cat) => cat.age === age);

  return (
    <div
      key={task.taskId}
      onClick={() => router.push(`/tasks/${task.taskId}`)}
      className="cursor-pointer p-2 my-1 z-0 bg-white border border-gray-300 rounded-lg hover:bg-neutral-100 transition ease-out duration-500"
    >
      <div className="flex justify-between">
        <div className="">
          <div className="flex flex-row items-end gap-2">
            <h2 className="text-xl text-cod-gray-950 font-medium">
              {task.title}
            </h2>
            <h2>{" · "}</h2>
            <h3 className="text-base text-cod-gray-300 font-light">
              {task.year}
            </h3>
          </div>
        </div>

        <div className="w-1/3 mt-5 flex justify-end flex-wrap">
          {keywords.map((keyword: string, i: number) => (
            <TaskKeyword keyword={keyword} key={i} />
          ))}
        </div>
      </div>
      <ul>
        {taskAgeCat && (
          <TaskLevel age={taskAgeCat.age} level={taskAgeCat.level} />
        )}
      </ul>
    </div>
  );
};

export default TaskCard;
