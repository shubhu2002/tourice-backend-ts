import { model, Schema, Document } from "mongoose";

export interface SubscribeConstructor extends Document {
  email: string;
}

const subscribeSchema: Schema = new Schema<SubscribeConstructor>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model<SubscribeConstructor>("Subscribe", subscribeSchema);
