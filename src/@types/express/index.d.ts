import User from "../../app/modules/user/user.model";
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: User;
    }
  }
}
