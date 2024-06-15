import { Router } from "express";
import { facilityController } from "./facility.controller";

const router = Router();
router.post("/", facilityController.createFacility);
router.get("/:facilityId", facilityController.getSingleFacility);
router.put("/:facilityId", facilityController.updateFacility);
router.get("/", facilityController.getAllFacility);

export const facilityRoute = router;
