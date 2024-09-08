import { Types } from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDb = async (payload: TFacility) => {
  try {
    const facilityData = {
      ...payload,
    };
    const facility = await Facility.create(facilityData);
    return facility;
  } catch (error: any) {
    console.log(error.message);
  }
};

// get all facility
const getAllFacilityFromDB = async () => {
  const facilities = await Facility.find();
  return facilities;
};

// Get single facility by ID
const getSingleFacilityFromDbB = async (id: string) => {
  try {
    const facility = await Facility.findById(id);
    if (!facility) {
      throw new Error("Facility not found");
    }
    return facility;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateFacilityIntoDB = async (id: string, data: Partial<TFacility>) => {
  const update = await Facility.findByIdAndUpdate(id, data, { new: true });
  if (!update) {
    throw new Error(`facility did't updated`);
  }
  return update;
};
const deleteFacilityFromDB = async (id: string) => {
  const remove = await Facility.findByIdAndDelete(id);
  if (!remove) {
    throw new Error(`facility did't deleted`);
  }
  return remove;
};

export const facilityService = {
  createFacilityIntoDb,
  getAllFacilityFromDB,
  getSingleFacilityFromDbB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
};
