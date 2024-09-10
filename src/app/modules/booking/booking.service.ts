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
  return booking;
};

// get all booking
const getAllBookingFromDB = async () => {
  const allBookings = await Booking.find();

  return allBookings;
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

// check availability
export const getBookingsByDate = async (date: string): Promise<TBooking[]> => {
  const bookings = await Booking.find({ date }).exec();
  return bookings;
};

// check availability
export const findAvailableSlotFromDb = (
  bookings: TBooking[],
  openingTime: string,
  closingTime: string
): { startTime: string; endTime: string }[] => {
  const totalSlots = generateTimeSlots(openingTime, closingTime);
  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  const availableSlots = calculateAvailableSlots(totalSlots, bookedSlots);
  return availableSlots;
};

const generateTimeSlots = (
  openingTime: string,
  closingTime: string
): { startTime: string; endTime: string }[] => {
  const slots = [];
  let start = parseTime(openingTime);
  const end = parseTime(closingTime);

  while (start < end) {
    const next = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Increment by 2 hours
    slots.push({
      startTime: formatTime(start),
      endTime: formatTime(next),
    });
    start = next;
  }

  return slots;
};

const calculateAvailableSlots = (
  totalSlots: { startTime: string; endTime: string }[],
  bookedSlots: { startTime: string; endTime: string }[]
): { startTime: string; endTime: string }[] => {
  return totalSlots.filter((slot) => {
    return !bookedSlots.some(
      (booked) =>
        booked.startTime < slot.endTime && booked.endTime > slot.startTime
    );
  });
};

const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};
export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUser,
  cancelBookingFromDB,
  findAvailableSlotFromDb,
};
