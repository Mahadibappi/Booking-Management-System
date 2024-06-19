"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const booking_service_1 = require("./booking.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = req.body;
    const result = yield booking_service_1.BookingService.createBookingIntoDB(booking);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking Created Successfully",
        data: result,
    });
}));
// get all bookings
const getBookingByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    const result = yield booking_service_1.BookingService.getBookingByUser(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking By User Retrieved Successfully",
        data: result,
    });
});
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingService.getAllBookingFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Booking  Retrieved Successfully",
        data: result,
    });
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingService.cancelBookingFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Booking  Retrieved Successfully",
        data: result,
    });
}));
const checkAvailableSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const bookings = yield (0, booking_service_1.getBookingsByDate)(date);
    const openingTime = "08:00";
    const closingTime = "18:00";
    const result = (0, booking_service_1.findAvailableSlotFromDb)(bookings, openingTime, closingTime);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Availability checked successfully",
        data: result,
    });
}));
exports.bookingController = {
    createBooking,
    getAllBooking,
    getBookingByUser,
    cancelBooking,
    checkAvailableSlot,
};
