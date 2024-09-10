import { Types } from "mongoose";

export type TBooking = {
  _id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
};
