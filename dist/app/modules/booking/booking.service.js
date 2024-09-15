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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = exports.findAvailableSlotFromDb = exports.getBookingsByDate = void 0;
const booking_model_1 = require("./booking.model");
const formatBookingDate = (booking) => {
    return Object.assign(Object.assign({}, booking.toObject()), { date: booking.date.toISOString().split("T")[0] });
};
// create booking
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.create(payload);
    return booking;
});
// get all booking
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield booking_model_1.Booking.find();
    return allBookings;
});
// cancel booking
const cancelBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cancelBooking = yield booking_model_1.Booking.findByIdAndDelete(id)
        .populate("facility")
        .populate("user", "-password");
    return cancelBooking;
});
// get booking by user
const getBookingByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ userId })
        .populate("facility")
        .populate("user", "-password");
    if (!bookings || bookings.length === 0) {
        console.log("No bookings found for the provided userId.");
    }
    return bookings.map(formatBookingDate);
});
// check availability
const getBookingsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.Booking.find({ date }).exec();
    return bookings;
});
exports.getBookingsByDate = getBookingsByDate;
// check availability
const findAvailableSlotFromDb = (bookings, openingTime, closingTime) => {
    const totalSlots = generateTimeSlots(openingTime, closingTime);
    const bookedSlots = bookings.map((booking) => ({
        startTime: booking.startTime,
        endTime: booking.endTime,
    }));
    const availableSlots = calculateAvailableSlots(totalSlots, bookedSlots);
    return availableSlots;
};
exports.findAvailableSlotFromDb = findAvailableSlotFromDb;
const generateTimeSlots = (openingTime, closingTime) => {
    const slots = [];
    let start = parseTime(openingTime);
    const end = parseTime(closingTime);
    while (start < end) {
        const next = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Increment by 2 hours
        slots.push({
            startTime: formatTime(start),
            endTime: formatTime(next),
        });
        start = next;
    }
    return slots;
};
const calculateAvailableSlots = (totalSlots, bookedSlots) => {
    return totalSlots.filter((slot) => {
        return !bookedSlots.some((booked) => booked.startTime < slot.endTime && booked.endTime > slot.startTime);
    });
};
const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};
const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
};
exports.BookingService = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getBookingByUser,
    cancelBookingFromDB,
    findAvailableSlotFromDb: exports.findAvailableSlotFromDb,
};
