import getTasks, { ISearchParams } from "@/app/actions/getTasks";
import Empty from "@/app/components/Empty";
import SideBar from "@/app/components/sidebar/SideBar";
import TaskCard from "@/app/components/tasks/TaskCard";

interface TasksProps {
  searchParams: ISearchParams;
}

export default async function TasksPage({ searchParams }: TasksProps) {
  const tasks = getTasks(searchParams);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 ">
        <div className="hidden col-span-1 md:block md:col-span-1">
          <SideBar />
        </div>
        <div className="col-span-1 md:col-span-3 mx-2">
          {tasks.map((task: any) => (
            <TaskCard task={task} />
          ))}
          {tasks.length === 0 ? <Empty showButton /> : <></>}
        </div>
      </div>
    </div>
  );
}
