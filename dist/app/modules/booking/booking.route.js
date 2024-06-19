"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(booking_validation_1.bookingValidation), booking_controller_1.bookingController.createBooking);
router.get("/", booking_controller_1.bookingController.getAllBooking);
router.get("/:user", booking_controller_1.bookingController.getBookingByUser);
router.delete("/:id", booking_controller_1.bookingController.cancelBooking);
exports.bookingRoute = router;
