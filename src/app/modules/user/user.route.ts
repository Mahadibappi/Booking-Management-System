import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  userController.createUser
);
router.post(
  "/admin",
  auth(USER_ROLE.admin),
  validateRequest(userValidationSchema),
  userController.createUser
);

router.post("/login", userController.Login);

export const userRoute = router;
