import { Request, Response } from "express";
import { UserService } from "./auth.service";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserService.createUserIntoDB(user);
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    const { password: _, ...excludePassword } = result.toObject();
    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User LoggedIn Successfully",
      data: excludePassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = { createUser, Login };
