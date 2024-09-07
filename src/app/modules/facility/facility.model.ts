import { Schema, model } from "mongoose";
import { TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: String, required: true },
  location: { type: String },
});

export const Facility = model<TFacility>("Facility", facilitySchema);
