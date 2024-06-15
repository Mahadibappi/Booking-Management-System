import { Request, Response } from "express";
import { facilityService } from "./facility.service";
import httpStatus from "http-status";
import { Facility } from "./facility.model";

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
    res.status(200).json({
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
    const { facilityId } = req.params;
    const result = await facilityService.getFacilityFromDbB(facilityId);
    res.status(httpStatus.OK).json({
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
    const id = req.params.id;
    const result = await facilityService.updateFacilityIntoDB(id, data);
    if (!result) {
      return res.status(404).json({ message: "facility not found" });
    }
    res.status(200).json({
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

export const facilityController = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateFacility,
};
