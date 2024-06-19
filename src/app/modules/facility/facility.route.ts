import { Router } from "express";
import { facilityController } from "./facility.controller";
import validateRequest from "../../middlewares/validateRequest";
import facilityValidation from "./facility.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();
router.post(
  "/",
  validateRequest(facilityValidation),
  auth(USER_ROLE.admin),
  facilityController.createFacility
);
router.get("/:id", facilityController.getSingleFacility);
router.put("/:id", auth(USER_ROLE.admin), facilityController.updateFacility);
router.get("/", facilityController.getAllFacility);
router.delete("/:id", auth(USER_ROLE.admin), facilityController.deleteFacility);

export const facilityRoute = router;
