"use client";

import TaskHtmlFrame from "../../components/tasks_components/TaskHtmlFrame";
import TaskKeyword from "@/app/components/tasks_components/TaskKeyword";
import TaskDownloadZip from "@/app/components/tasks_components/TaskDownloadZip";
import { Task } from "@/app/types/Task";
import TaskDownloadPdf from "@/app/components/tasks_components/TaskDownloadPdf";

interface TaskClientProps {
  task: Task;
  htmlContent: string;
  mdContent: string;
  texContent: string;
}

export default function TaskClient({
  task,
  htmlContent,
  mdContent,
  texContent,
}: TaskClientProps) {
  return (
    <div>
      <div className="">
        <div className="h-1/6 flex justify-between border-b-2">
          <div className=" w-1/3 py-2 px-5 ml-2 border-r-2">
            <h1 className="text-lg font-bold">Mots-clés</h1>
            {task.bebrasKeywords?.map((keyword, index) => (
              <TaskKeyword key={`keyword${index}`} keyword={keyword} />
            ))}
          </div>

          <div className="w-1/3 py-2 px-5 border-r-2">
            <h1 className="text-lg font-bold">Catégories</h1>
            <ul className=" list-disc pl-7">
              {task.bebrasCategories.map((cat, index) => (
                <div key={`cat${index}`}>
                  <li className="text-base">{cat.category}</li>
                  <ul className="ml-3 list-square">
                    <li key={cat.sub_categories[0]} className="text-xs">
                      {cat.sub_categories}
                    </li>
                  </ul>
                </div>
              ))}
            </ul>
          </div>

          <div className="w-1/3 py-2 px-5 justify-end mr-2">
            <h1 className="text-lg font-bold">Téléchargements</h1>
            <div className="flex flex-row items-center justify-start">
              <TaskDownloadZip
                taskId={task.taskId}
                htmlContent={htmlContent}
                mdContent={mdContent}
                texContent={texContent}
              />
              <TaskDownloadPdf taskId={task.taskId} />
            </div>
          </div>
        </div>
        <div className="mx-2">
          <TaskHtmlFrame htmlText={htmlContent} />
        </div>
      </div>
    </div>
  );
}
