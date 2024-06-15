import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import User from "./auth.model";
import { comparePassword, hashPassword } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
  try {
    payload.password = await hashPassword(payload.password);
    const newUser = await User.create(payload);
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("This user not exist");
  }
  const isPasswordValid = await comparePassword(password, user?.password);
  if (!isPasswordValid) {
    throw new Error("Password did't match");
  }
  return user;
};
export const UserService = { createUserIntoDB, loginUser };
