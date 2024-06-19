"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const booking_controller_1 = require("./app/modules/booking/booking.controller");
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.use("/api", routes_1.default);
// check booking availability
app.get("/api/check-availability", booking_controller_1.bookingController.checkAvailableSlot);
//global error handler
app.use(globalErrorhandler_1.default);
exports.default = app;
