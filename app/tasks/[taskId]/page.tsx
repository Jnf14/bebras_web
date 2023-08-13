import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import { getTaskHtmlString } from "@/app/libs/utils";
import getTaskById from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";

interface TaskPageProps {
  taskId: string;
}

export default async function TaskPage(props: TaskPageProps) {
  const { taskId } = props;
  const task = await getTaskById({ taskId });

  if (task == null) {
    return <Empty />;
  }

  const htmlText = getTaskHtmlString(task.filePath);

  return (
    <div>
      <h1 className="text-lg font-bold">{task.engTitle}</h1>
      <TaskHtmlFrame htmlText={htmlText} />
    </div>
  );
}
