"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const facilityValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty(),
        description: zod_1.z.string().nonempty(),
        pricePerHour: zod_1.z.number().positive(),
        location: zod_1.z.string().nonempty().optional(),
    }),
});
exports.default = facilityValidation;
