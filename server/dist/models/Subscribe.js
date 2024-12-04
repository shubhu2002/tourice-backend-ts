import { model, Schema } from "mongoose";
const subscribeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
export default model("Subscribe", subscribeSchema);
