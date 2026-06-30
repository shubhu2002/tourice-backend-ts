import mongoose from "mongoose";
import { Sentry } from "../sentry.js";
const MongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        Sentry.captureException(error);
        console.error("MongoDB connection Fails", error);
        process.exit(1);
    }
};
export default MongooseConnect;
