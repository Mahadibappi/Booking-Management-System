import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import User from "../modules/user/user.model";

// Extend Express Request interface to include token and user
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: JwtPayload | any;
    }
  }
}

// Define the authentication middleware
const auth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ error: "User not authenticated" });
    }

    try {
      // Verify the token and extract the payload
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as jwt.JwtPayload;

      // Ensure the decoded token contains an id
      if (!decoded.id) {
        throw new Error("Invalid token: No user ID found");
      }

      // Find the user in the database by ID and access token
      const user = await User.findOne({
        _id: decoded.id,
      });

      // If no user is found, throw an error
      if (!user) {
        throw new Error("User Not Exist");
      }

      // Attach the token and user to the request object
      req.token = token;
      req.user = user;

      next();
    } catch (error: any) {
      res.status(401).send({ error: "Please authenticate" });
    }
  }
);

export default auth;
