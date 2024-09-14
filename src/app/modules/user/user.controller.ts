import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserService.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserService.createUserIntoDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created Successfully",
    data: result,
  });
});

const Login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await UserService.loginUser(email, password);

  const { password: _, name, ...excludePassword } = user.toObject();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged In Successfully",
    data: { user: { name, ...excludePassword }, token },
  });
});

export const userController = { createUser, Login, createAdmin };
