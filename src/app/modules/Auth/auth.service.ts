import httpStatus from "http-status";

import config from "../../config";
import AppError from "../../errors/AppError";

import { createToken } from "./auth.utils";
import { TUserLogin } from "../user/user.interface";
import User from "../user/user.model";

const loginUser = async (payload: TUserLogin) => {
  // checking if the user is exist
  const { email } = payload;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
