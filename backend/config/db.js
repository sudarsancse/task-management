import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Server connected to Database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
