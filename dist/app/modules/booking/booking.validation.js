"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
// src/validations/bookingValidation.ts
const zod_1 = require("zod");
exports.bookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        facility: zod_1.z.string().nonempty(),
        date: zod_1.z.string().nonempty(),
        startTime: zod_1.z.string().nonempty(),
        endTime: zod_1.z.string().nonempty(),
        user: zod_1.z.string().nonempty(),
        payableAmount: zod_1.z.number().positive(),
        isBooked: zod_1.z.enum(["confirmed", "pending", "cancelled"]),
    }),
});
