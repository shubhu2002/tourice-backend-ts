import mongoose from "mongoose";
const MongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("MongoDB connection Fails", error);
    }
};
export default MongooseConnect;
