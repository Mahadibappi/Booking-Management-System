import express from "express";
import { userController } from "./auth.controller";
const router = express.Router();

router.post("/signup", userController.createUser);
router.get("/login", userController.Login);
export const userRoute = router;
