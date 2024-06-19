import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/signup", userController.createUser);
router.get("/login", auth, userController.Login);
export const userRoute = router;
