import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
export const mongo_connection = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: "MyTaskApp",
    });
    console.log("Connected to Mongo DB");
  } catch (error) {
    throw new Error("Connection to mongo database failed");
  }
};
