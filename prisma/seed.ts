import prisma from './prisma'
import { insertAllTasks, insertTask } from './task'

async function main() {
    // Clear database table
    // TODO

    // Test for one task
    // insertTask('2022-VN-05_Colorful_tower')

    // Insert all existing tasks
    insertAllTasks()
}

// Run main seeding function
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
