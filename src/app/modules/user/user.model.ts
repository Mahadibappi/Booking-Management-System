import { TUser } from "./user.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<TUser>({
  id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  address: { type: String, required: true },
});

const User = model<TUser>("User", userSchema);
export default User;
