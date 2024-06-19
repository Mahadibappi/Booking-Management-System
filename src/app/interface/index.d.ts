import { Request } from "express";
import { UserDocument } from "../modules/user/user.model";

declare module "express-serve-static-core" {
  interface Request {
    token?: string;
    user?: UserDocument;
  }
}
