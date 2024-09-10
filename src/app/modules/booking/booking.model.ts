import mongoose, { Schema, Document } from "mongoose";
import { TBooking } from "./booking.interface";

// Mongoose model for bookings
const BookingSchema: Schema = new Schema<TBooking>({
  date: { type: String, required: true },
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  payableAmount: { type: Number, required: true },
});

export const Booking = mongoose.model<TBooking & Document>(
  "Booking",
  BookingSchema
);
