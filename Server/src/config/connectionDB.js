import mongoose from "mongoose";
import { MONGO_URI } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log(`Connect DB error: ${error}`);
  }
};
