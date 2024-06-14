import { TUser, TUserLogin } from "./auth.interface";
import User from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
  try {
    const newUser = await User.create(payload);
    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

const loginUser = async (payload: TUser) => {
  try {
    const user = await User.findOne(payload);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const UserService = { createUserIntoDB, loginUser };
