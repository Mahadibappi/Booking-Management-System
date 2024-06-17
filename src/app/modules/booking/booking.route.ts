import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBooking);
router.get("/user", bookingController.getBookingByUser);
router.delete("/:id", bookingController.cancelBooking);

export const bookingRoute = router;
