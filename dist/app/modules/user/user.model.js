"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    address: { type: String, required: true },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
