import prisma from "@/app/libs/prismadb";

export interface ISearchParams {
  age: string
}

/**
 * Get all tasks from Task collection
 */
export default async function getTasks(params: ISearchParams) {
  try {
    const {
      // To fill
    } = params;

    let query: any = {};
    console.log(params.age)
    console.log("test2")

    // if (userId) {
    //   query.userId = userId;
    // }

    // if (category) {
    //   query.category = category;
    // }

    // if (roomCount) {
    //   query.roomCount = {
    //     gte: +roomCount,
    //   };
    // }

    // if (guestCount) {
    //   query.guestCount = {
    //     gte: +guestCount,
    //   };
    // }

    // if (bathroomCount) {
    //   query.bathroomCount = {
    //     gte: +bathroomCount,
    //   };
    // }

    // if (locationValue) {
    //   query.locationValue = locationValue;
    // }

    // if (startDate && endDate) {
    //   query.NOT = {
    //     reservations: {
    //       some: {
    //         OR: [
    //           {
    //             endDate: { gte: startDate },
    //             startDate: { lte: startDate },
    //           },
    //           {
    //             startDate: { lte: endDate },
    //             endDate: { gte: endDate },
    //           },
    //         ],
    //       },
    //     },
    //   };
    // }

    const tasks = await prisma.task.findMany({
      where: query,
      orderBy: {
        taskId: "desc",
      },
    });

    return tasks;
  } catch (error: any) {
    throw new Error(error);
  }
}
