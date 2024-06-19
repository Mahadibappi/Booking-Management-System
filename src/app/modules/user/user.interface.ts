import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  address: string;
};
export type TUserLogin = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {}

export type TUserRole = keyof typeof USER_ROLE;
