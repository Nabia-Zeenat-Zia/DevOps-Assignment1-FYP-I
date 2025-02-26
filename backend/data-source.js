import mongoose from "mongoose";
import { config } from "dotenv";

config();
const MONGO = process.env.MONGO_URL;

const dataSource = {
  connect: async () => {
    try {
      await mongoose.connect(MONGO);
      console.log("Connected to Database");
    } catch (error) {
      console.error("Error connecting to Database: ", error);
    }
  },
};

export default dataSource;
