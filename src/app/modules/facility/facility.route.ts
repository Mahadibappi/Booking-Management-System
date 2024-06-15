import { Router } from "express";
import { facilityController } from "./facility.controller";

const router = Router();
router.post("/", facilityController.createFacility);
router.get("/:id", facilityController.getSingleFacility);
router.put("/:id", facilityController.updateFacility);
router.get("/", facilityController.getAllFacility);
router.delete("/:id", facilityController.deleteFacility);

export const facilityRoute = router;
