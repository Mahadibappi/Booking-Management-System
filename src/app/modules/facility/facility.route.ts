import { Router } from "express";
import { facilityController } from "./facility.controller";
import validateRequest from "../../middlewares/validateRequest";
import facilityValidation from "./facility.validation";

const router = Router();
router.post(
  "/",
  validateRequest(facilityValidation),
  facilityController.createFacility
);
router.get("/:id", facilityController.getSingleFacility);
router.put("/:id", facilityController.updateFacility);
router.get("/", facilityController.getAllFacility);
router.delete("/:id", facilityController.deleteFacility);

export const facilityRoute = router;
