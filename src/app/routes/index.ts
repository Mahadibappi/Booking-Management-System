import { Router } from "express";
import { userRoute } from "../modules/Auth/auth.route";
import { facilityRoute } from "../modules/facility/facility.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: userRoute,
  },
  {
    path: "/facility",
    route: facilityRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
