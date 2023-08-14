import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import { getTaskHtmlString } from "@/app/libs/utils";
import getTaskById, { IParams } from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";
import TaskKeyword from "@/app/components/tasks/TaskKeyword";

interface TaskPageProps {
  params: IParams;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const task = await getTaskById(params);

  if (task == null) {
    return <Empty />;
  }

  const htmlText = getTaskHtmlString(task.filePath);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 px-1">
        <h1 className="text-lg font-bold">Keywords</h1>
        {task.bebras_keywords?.map((keyword) => (
          <TaskKeyword keyword={keyword} />
        ))}
      </div>
      <div className="col-span-3 ml-3">
        <TaskHtmlFrame htmlText={htmlText} />
      </div>
    </div>
  );
}
