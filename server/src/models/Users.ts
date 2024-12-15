import { Schema, model, Document, Types } from "mongoose";

export interface UserConstructor extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserConstructor>(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<UserConstructor>("User", userSchema);
