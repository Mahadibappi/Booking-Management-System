import { Types } from "mongoose";

export type TBooking = {
  _id: string;
  facility: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "pending" | "cancelled";
};
