import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String },
  image: { type: String },
});

export const Facility = model<TFacility>("Facility", facilitySchema);
