import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("⏳ Checking database connection...");

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection is successful!");
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
