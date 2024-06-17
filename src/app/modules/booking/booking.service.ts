import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const formatBookingDate = (booking: any) => {
  return {
    ...booking.toObject(),
    date: booking.date.toISOString().split("T")[0],
  };
};
// create booking
const createBookingIntoDB = async (payload: TBooking) => {
  const booking = await Booking.create(payload);
  return formatBookingDate(booking);
};

// get all booking
const getAllBookingFromDB = async () => {
  const allBookings = await Booking.find()
    .populate("facility")
    .populate("user", "-password");
  return allBookings.map(formatBookingDate);
};

// get booking by user
const getBookingByUser = async (userId: string) => {
  const booking = await Booking.find({ user: userId })
    .populate("facility")
    .populate("user", "-password");
  return booking.map(formatBookingDate);
};

// cancel booking
const cancelBookingFromDB = async (id: string) => {
  const cancelBooking = await Booking.findByIdAndDelete(id)
    .populate("facility")
    .populate("user", "-password");
  return cancelBooking;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUser,
  cancelBookingFromDB,
};
