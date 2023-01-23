import { config } from "dotenv";
import mongoose from "mongoose";
import server from "./server";

config();

try {
  const port = process.env.PORT || 8000;

  await mongoose.connect(process.env.MONGODB_URL);
  mongoose.set("strictQuery", true);

  server.listen(port, () => {
    console.log(`[Server] Server is running at localhost:${port}`);
  });
} catch (err) {
  console.log(err.message);
}
