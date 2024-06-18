export type TUser = {
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
