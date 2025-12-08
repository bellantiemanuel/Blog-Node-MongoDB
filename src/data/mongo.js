import mongoose from "mongoose";
import 'dotenv/config';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "tienda"
    });

    console.log("MongoDB conectado a la base: tienda");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}
