import * as bb from "bebras";
import TaskHtmlFrame from "../../components/tasks/TaskHtmlFrame";
import { getTaskFile } from "@/app/libs/utils";
import Container from "../../components/Container";
import getTaskById, { ISearchParams } from "@/app/actions/getTaskById";
import Empty from "@/app/components/Empty";
import TaskHtmlInnerSet from "@/app/components/tasks/TaskHtmlInnerSet";

interface TaskPageProps {
  params: ISearchParams;
}

export default async function TaskPage({ params }: TaskPageProps) {
  const { taskId } = params;
  const task = await getTaskById(params);

  if (task == null) {
    return <Empty />;
  }

  const t_text = getTaskFile(task.filePath);
  const [htmlText, metadata] = bb.convert_html.renderMarkdown(
    t_text,
    task.dirPath,
    false
  );
  return (
    <Container>
      <TaskHtmlFrame htmlText={htmlText} />
    </Container>
  );
}
