import mongoose from "mongoose";

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection Fails", error);
    process.exit(1);
  }
};

export default MongooseConnect;
