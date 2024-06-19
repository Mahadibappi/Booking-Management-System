import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { facilityRoute } from "../modules/facility/facility.route";
import { bookingRoute } from "../modules/booking/booking.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/facility",
    route: facilityRoute,
  },
  {
    path: "/bookings",
    route: bookingRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
