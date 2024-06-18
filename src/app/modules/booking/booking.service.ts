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

// cancel booking
const cancelBookingFromDB = async (id: string) => {
  const cancelBooking = await Booking.findByIdAndDelete(id)
    .populate("facility")
    .populate("user", "-password");
  return cancelBooking;
};

// get booking by user
const getBookingByUser = async (userId: string) => {
  const bookings = await Booking.find({ userId })
    .populate("facility")
    .populate("user", "-password");

  if (!bookings || bookings.length === 0) {
    console.log("No bookings found for the provided userId.");
  }

  return bookings.map(formatBookingDate);
};
export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUser,
  cancelBookingFromDB,
};
