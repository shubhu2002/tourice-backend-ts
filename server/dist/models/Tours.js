import { model, Schema } from "mongoose";
const tourSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    topPlaces: {
        type: [String],
        required: true,
    },
}, { timestamps: true });
export default model("Tour", tourSchema);
