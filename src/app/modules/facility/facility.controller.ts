import { Request, Response } from "express";
import { facilityService } from "./facility.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Facility } from "./facility.model";
import uploadImage from "../../utils/cloudinary";
import { TFacility } from "./facility.interface";

const createFacility = catchAsync(async (req: Request, res: Response) => {
  try {
    const { name, description, pricePerHour, location } = req.body;

    let imageUrl: string | undefined = undefined;

    // upload image to cloudinary
    if (req.file) {
      try {
        imageUrl = await uploadImage(req.file.path);
      } catch (error) {
        console.log((error as Error).message);
      }
    }

    const facilityData: TFacility = {
      name,
      description,
      pricePerHour: Number(pricePerHour),
      location,
      image: imageUrl,
    };

    const facility = await Facility.create(facilityData);

    res.status(201).json({
      success: true,
      data: facility,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await facilityService.getAllFacilityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility Retrieved Successfully",
    data: result,
  });
});

//get single facility by id
const getSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await facilityService.getSingleFacilityFromDbB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Facility Retrieved Successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = req.params;

  const result = await facilityService.updateFacilityIntoDB(id, data);
  if (!result) {
    return res.status(404).json({ message: "facility not updated" });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Facility Updated Successfully",
    data: result,
  });
});
const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await facilityService.deleteFacilityFromDB(id);
  if (!result) {
    return res.status(404).json({ message: "facility not deleted" });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Facility Deleted Successfully",
    data: result,
  });
});

export const facilityController = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
