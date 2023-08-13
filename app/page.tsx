import getTasks, { ISearchParams } from "@/app/actions/getTasks";
import Container from "@/app/components/Container";
import Empty from "@/app/components/Empty";
import TaskCard from "./components/tasks/TaskCard";

interface HomeProps {
  searchParams: ISearchParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const tasks = await getTasks(searchParams);

  if (tasks.length === 0) {
    return <Empty showButton />;
  }

  return (
    <Container>
      <div className="grid md:grid-cols-4">
        <div className="bg-gray-200"></div>
        <div className="md:col-span-3 ml-3">
          {tasks.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
    </Container>
  );
}
