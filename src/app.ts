import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", router);

//global error handler
app.use(globalErrorHandler);
export default app;
