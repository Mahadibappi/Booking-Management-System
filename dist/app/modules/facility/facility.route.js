"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoute = void 0;
const express_1 = require("express");
const facility_controller_1 = require("./facility.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = __importDefault(require("./facility.validation"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(facility_validation_1.default), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.facilityController.createFacility);
router.get("/:id", facility_controller_1.facilityController.getSingleFacility);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.facilityController.updateFacility);
router.get("/", facility_controller_1.facilityController.getAllFacility);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.facilityController.deleteFacility);
exports.facilityRoute = router;
