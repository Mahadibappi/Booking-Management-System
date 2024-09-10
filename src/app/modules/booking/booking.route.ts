import { Router } from "express";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  validateRequest(bookingValidation),
  auth(USER_ROLE.admin),
  bookingController.createBooking
);
router.get("/", auth(USER_ROLE.admin), bookingController.getAllBooking);
router.get("/:user", auth(USER_ROLE.user), bookingController.getBookingByUser);
router.delete("/:id", auth(USER_ROLE.user), bookingController.cancelBooking);

export const bookingRoute = router;
