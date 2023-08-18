import getTasks, { ISearchParams } from "@/app/actions/getTasks";
import Container from "@/app/components/Container";
import Empty from "@/app/components/Empty";
import TaskCard from "./components/tasks/TaskCard";
import AgeFilter from "./components/sidebar/AgeFilter";

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
        <div className="md:col-span-1 mx-2">
          <AgeFilter />
        </div>
        <div className="md:col-span-3 mx-2">
          {tasks.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
    </Container>
  );
}
