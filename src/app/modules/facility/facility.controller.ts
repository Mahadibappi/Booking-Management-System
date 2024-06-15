import { Request, Response } from "express";
import { facilityService } from "./facility.service";
import httpStatus from "http-status";

const createFacility = async (req: Request, res: Response) => {
  try {
    const facility = req.body;

    const result = await facilityService.createFacilityIntoDb(facility);
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility Created Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFacility = async (req: Request, res: Response) => {
  try {
    const result = await facilityService.getAllFacilityFromDB();

    res.json({
      statusCode: httpStatus.OK,
      success: true,
      message: "All Facility retrieved Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single facility by id
const getSingleFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await facilityService.getSingleFacilityFromDbB(id);

    res.json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFacility = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { id } = req.params;

    const result = await facilityService.updateFacilityIntoDB(id, data);
    if (!result) {
      return res.status(404).json({ message: "facility not updated" });
    }

    res.json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility Updated Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await facilityService.deleteFacilityFromDB(id);
    if (!result) {
      return res.status(404).json({ message: "facility not deleted" });
    }

    res.json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Facility Deleted Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const facilityController = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
