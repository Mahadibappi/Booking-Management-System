import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", router);
export default app;
