import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import User from "../modules/user/user.model";

const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as jwt.JwtPayload;

      const user = await User.findOne({
        _id: decoded.id,
        "access-token": token,
      });
      if (!user) {
        throw new Error("User Not Exist");
      }

      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate" });
    }
  }
);

export default auth;
