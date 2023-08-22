import getTasks, { ISearchParams } from "@/app/actions/getTasks";
import Container from "@/app/components/Container";
import Empty from "@/app/components/Empty";
import TaskCard from "./components/tasks/TaskCard";
import AgeCategoriesFilter from "./components/filters/AgeCategoriesFilter";
import CategoriesFilter from "./components/filters/CategoryFilter";
import AlgoSubCategoryFilter from "./components/filters/AlgoSubCategoryFilter";

interface HomeProps {
  searchParams: ISearchParams;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const tasks = getTasks(searchParams);

  if (tasks.length === 0) {
    return <Empty showButton />;
  }

  return (
    <Container>
      <div className="grid md:grid-cols-4">
        <div className="md:col-span-1 mx-2">
          <AgeCategoriesFilter />
        </div>
        <div className="md:col-span-1 mx-2">
          <CategoriesFilter />
        </div>
        <div className="md:col-span-1 mx-2">
          <AlgoSubCategoryFilter />
        </div>
        <div className="md:col-span-3 mx-2">
          {tasks.map((task: any) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
    </Container>
  );
}
