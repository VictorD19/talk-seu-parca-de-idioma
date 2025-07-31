import app from "./infrastructure/app";
import connectToMongoDB from "./infrastructure/database/mongo";

async function startServer() {
  await connectToMongoDB()
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

startServer()
