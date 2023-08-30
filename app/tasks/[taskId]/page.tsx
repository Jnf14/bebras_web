import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import {
  getTaskHtmlString,
  getTaskMdString,
  getTaskTexString,
} from "@/app/libs/utils";
import getTaskById from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";
import TaskKeyword from "@/app/components/tasks/TaskKeyword";
import TaskDownloadZip from "@/app/components/tasks/TaskDownloadZip";
import { Task } from "@/app/types/Task";
import TaskDownloadPdf from "@/app/components/tasks/TaskDownloadPdf";
import { Suspense } from "react";
import Loading from "@/app/loading";

interface TaskPageProps {
  params: { taskId: string };
}

export default function TaskPage({ params }: TaskPageProps) {
  const task: Task = getTaskById(params.taskId);

  if (task == null) {
    return <Empty subtitle="La tâche recherchée n'existe pas." />;
  }

  const htmlContent = getTaskHtmlString(task.filePath);
  const mdContent = getTaskMdString(task.filePath);
  const texContent = getTaskTexString(task.filePath);

  return (
    <div>
      <div className="">
        <Suspense fallback={<Loading />}>
          <div className="h-1/6 flex justify-between border-b-2">
            <div className=" w-1/3 py-2 px-5 ml-2 border-r-2">
              <h1 className="text-lg font-bold">Mots-clés</h1>
              {task.bebrasKeywords?.map((keyword) => (
                <TaskKeyword keyword={keyword} />
              ))}
            </div>

            <div className="w-1/3 py-2 px-5 border-r-2">
              <h1 className="text-lg font-bold">Catégories</h1>
              <ul className=" list-disc pl-7">
                {task.bebrasCategories.map((cat) => (
                  <>
                    <li className="text-base">{cat.category}</li>
                    <ul className="ml-3 list-square">
                      <li className="text-xs">{cat.sub_categories}</li>
                    </ul>
                  </>
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
        </Suspense>
      </div>
    </div>
  );
}
