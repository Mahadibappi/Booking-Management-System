import User from "../../app/modules/user/user.model";
import { JwtHeader } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: JwtPayload;
    }
  }
}
