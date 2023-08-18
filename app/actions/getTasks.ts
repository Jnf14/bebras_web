import prisma from "@/app/libs/prismadb";
import { Task } from "@prisma/client";

export interface ISearchParams {
  ages?: string;
}

/**
 * Get all tasks from Task collection
 */
export default async function getTasks(params: ISearchParams): Promise<Task[]> {
  try {
    const { ages } = params;

    let query: any = {};

    if (ages) {
      query.OR = { age: ages };
    }

    const taskIds = await prisma.ageCategory.findMany({
      where: query,
      select: {
        taskId: true,
      },
    });

    const tasks = await prisma.task.findMany({
      where: {
        taskId: {
          in: taskIds.map((item) => item.taskId),
        },
      },
    });

    // const ages = await prisma.ageCategory.findMany({
    //   where: {
    //     age: {
    //       hasEvery: ["10-12"],
    //     }
    //   }
    //   orderBy: {
    //     taskId: "desc",
    //   },
    // });

    return tasks;
  } catch (error: any) {
    throw new Error(error);
  }
}
