import { Request, Response } from "express";
import { facilityService } from "./facility.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { v2 as cloudinary } from "cloudinary";
import { Facility } from "./facility.model";
import fs from "fs";

cloudinary.config({
  cloud_name: "cloud-mahadi",
  api_key: "628425217641132",
  api_secret: "RNTnDYsj8FjLKJUSygvr4v4TlhA",
  secure: true,
});

const createFacility = catchAsync(async (req: Request, res: Response) => {
  try {
    const { name, description, pricePerHour, location } = req.body;

    let imageUrl = "";

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "facilities",
        });
        imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ error: "Cloudinary upload failed" });
      }
    }

    const facilityData = {
      name,
      description,
      pricePerHour: Number(pricePerHour),
      location,
      image: imageUrl,
    };

    const facility = await Facility.create(facilityData);
    console.log(facility);
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
