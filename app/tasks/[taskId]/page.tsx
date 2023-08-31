import getTaskById from "@/app/(actions)/getTaskById";
import Empty from "@/app/(components)/Empty";
import { Task } from "@/app/(types)/Task";
import TaskPage from "./TaskPage";
import { Suspense } from "react";
import Loading from "@/app/loading";

interface TaskPageProps {
  params: { taskId: string };
}

export default function Page({ params }: TaskPageProps) {
  const task: Task = getTaskById(params.taskId);
  if (!task) {
    return <Empty subtitle="La tâche recherchée n'existe pas." />;
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Async Server Component */}
        <TaskPage task={task} />
      </Suspense>
    </div>
  );
}
