import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import User from "./user.model";
import { comparePassword, hashPassword } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  try {
    payload.password = await hashPassword(payload.password);
    const newUser = await User.create(payload);
    return newUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
// admin creation
const createAdminIntoDB = async (payload: TUser) => {
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

  //generate jwt token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt_access_secret as string,
    { expiresIn: "1d" }
  );

  return { user, token };
};
export const UserService = { createUserIntoDB, createAdminIntoDB, loginUser };
