import { TUser, TUserLogin } from "./auth.interface";
import User from "./auth.model";
import { comparePassword, hashPassword } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
  try {
    payload.password = await hashPassword(payload.password);
    const newUser = await User.create(payload);
    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await comparePassword(password, user?.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
export const UserService = { createUserIntoDB, loginUser };
