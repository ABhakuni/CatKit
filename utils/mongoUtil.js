import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

export const connectToDB = () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};
