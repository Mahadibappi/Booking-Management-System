// src/models/Booking.ts
import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema: Schema = new Schema<TBooking>({
  facility: { type: Schema.Types.ObjectId, required: true, ref: "Facility" },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  payableAmount: { type: Number, required: true },
  isBooked: {
    type: String,
    enum: ["confirmed", "pending", "cancelled"],
    required: true,
  },
});

export const Booking = mongoose.model<TBooking>("Booking", BookingSchema);
