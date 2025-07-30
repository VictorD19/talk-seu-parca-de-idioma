import { PrismaClient } from "@prisma/client";

let dbClient: PrismaClient;

let startDBPrisma = async () => {
    try {
        const prisma = new PrismaClient();
        await prisma.$connect()
        dbClient = prisma;
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }


}
export {
    dbClient,
    startDBPrisma
}