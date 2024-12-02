import { Schema, model, Document } from "mongoose";

export interface UserConstructor extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserConstructor>(
  {
    username: {
      type: String,
      required: true,
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
  { timestamps: true },
);

export default model<UserConstructor>("User", userSchema);
