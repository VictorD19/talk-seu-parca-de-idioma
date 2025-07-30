import app from "./infrastructure/app";
import { startDBPrisma } from "./infrastructure/database/prisma";

async function startServer() {
  await startDBPrisma()
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

startServer()
