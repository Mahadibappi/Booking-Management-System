import { Request, Response } from "express";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    const result = await BookingService.createBookingIntoDB(booking);
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all bookings
const getBookingByUser = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getBookingByUser;
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: " Booking By User Retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBooking = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getAllBookingFromDB();
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "All Booking Retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await BookingService.cancelBookingFromDB(id);
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingByUser,
  cancelBooking,
};
