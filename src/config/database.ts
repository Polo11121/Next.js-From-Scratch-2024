import mongoose from "mongoose";

let connected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Already connected to database");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
