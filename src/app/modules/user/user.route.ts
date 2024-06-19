import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  userController.createUser
);
router.get("/login", userController.Login);
export const userRoute = router;
