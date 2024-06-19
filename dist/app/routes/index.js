"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const facility_route_1 = require("../modules/facility/facility.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoute,
    },
    {
        path: "/facility",
        route: facility_route_1.facilityRoute,
    },
    {
        path: "/bookings",
        route: booking_route_1.bookingRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
