import { Router } from "express";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = Router();

router.post(
  "/",
  validateRequest(bookingValidation),
  bookingController.createBooking
);
router.get("/", bookingController.getAllBooking);
router.get("/:user", bookingController.getBookingByUser);
router.delete("/:id", bookingController.cancelBooking);

export const bookingRoute = router;
