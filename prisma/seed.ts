import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main () {
    await prisma.property.createMany({
        data: Array.from({length: 20}, () => {
            return {
                title: faker.internet.username(),
                description: faker.lorem.text(),
                type: faker.lorem.text(),
                price: faker.number.float(),
                ownerName: faker.internet.username(),
                ownerPhone: faker.phone.number()
            }
        })
    })
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });