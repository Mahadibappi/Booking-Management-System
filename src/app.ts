import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { bookingController } from "./app/modules/booking/booking.controller";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", router);
// check booking availability
app.get("/api/check-availability", bookingController.checkAvailableSlot);

//global error handler
app.use(globalErrorHandler);
export default app;
