import prisma from "@/app/libs/prismadb";

export interface ISearchParams {
  taskId?: string;
}

/**
 * Get one task from Task collection given its id
 * @param taskId the id of the task (format YYYY-CC-XX-lll)
 * @returns the task object
 */
export default async function getTaskById(params: ISearchParams) {
  try {
    const { taskId } = params;

    const task = await prisma.task.findUnique({
      where: {
        taskId: taskId,
      },
    });

    if (!task) {
      return null;
    }

    return {
      ...task,
      // createdAt: listing.createdAt.toString(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
