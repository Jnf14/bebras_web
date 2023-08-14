import prisma from "@/app/libs/prismadb";

export interface IParams {
  taskId?: string;
}
/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export default async function getTaskById(params: IParams) {
  try {
    const { taskId } = params;
    const task = await prisma.task.findFirst({
      where: {
        taskId: taskId,
      },
    });

    if (!task) {
      return null;
    }

    return {
      ...task,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
