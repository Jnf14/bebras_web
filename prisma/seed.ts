import path from "path";
import prisma from "../app/libs/prismadb";
import { insertAllTasks, insertTask } from "./task";

async function main() {
  // prisma.ageCategory.deleteMany();
  // prisma.category.deleteMany();

  prisma.task.deleteMany({});
  // Clear database table
  // TODO

  // Test for one task
  // insertTask("2022-VN-05_Colorful_tower");

  // Insert all existing tasks
  insertAllTasks();
}

// Run main seeding function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
