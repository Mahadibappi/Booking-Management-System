import express, { Application } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/Auth/auth.route";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/", userRoute);
export default app;
