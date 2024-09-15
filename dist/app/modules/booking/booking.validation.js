"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
// src/validations/bookingValidation.ts
const zod_1 = require("zod");
exports.bookingValidation = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().nonempty(),
        startTime: zod_1.z.string().nonempty(),
        endTime: zod_1.z.string().nonempty(),
        payableAmount: zod_1.z.number().positive(),
    }),
});
