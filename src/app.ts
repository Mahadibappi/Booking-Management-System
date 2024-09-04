import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { bookingController } from "./app/modules/booking/booking.controller";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

//routes
app.use("/api", router);
// check booking availability
app.get("/api/check-availability", bookingController.checkAvailableSlot);

//global error handler
app.use(globalErrorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("Booking Server Running");
});
export default app;
