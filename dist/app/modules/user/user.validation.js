"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Name is required"),
        email: zod_1.z
            .string()
            .email("Invalid email format")
            .nonempty("Email is required"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .nonempty("Password is required"),
        phone: zod_1.z.string().nonempty("Phone is required"),
        role: zod_1.z.enum(["admin", "user"]),
        address: zod_1.z.string().nonempty("Address is required"),
    }),
});
exports.default = userValidationSchema;
