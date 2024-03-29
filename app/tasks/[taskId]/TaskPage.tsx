import { Task } from "@/app/types/Task";
import TaskClient from "./TaskClient";
import {
  getTaskHtml,
  getTaskMd,
  getTaskTex,
} from "@/app/actions/getTaskContent";

interface TaskPageProps {
  task: Task;
}

export default async function TaskPage({ task }: TaskPageProps) {
  const htmlContent = await getTaskHtml(task.filePath);
  const mdContent = await getTaskMd(task.filePath);
  const texContent = await getTaskTex(task.filePath);

  return (
    <div>
      <TaskClient
        task={task}
        htmlContent={htmlContent}
        mdContent={mdContent}
        texContent={texContent}
      />
    </div>
  );
}
