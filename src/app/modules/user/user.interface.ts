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

export type TUserRole = keyof typeof USER_ROLE;
