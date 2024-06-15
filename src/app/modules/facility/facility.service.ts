import { Types } from "mongoose";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";
const createFacilityIntoDb = async (payload: TFacility) => {
  try {
    const facility = await Facility.create(payload);
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
const getFacilityFromDbB = async (id: string) => {
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
    console.error(`facility with id ${id} not`);
  }
  return update;
};

export const facilityService = {
  createFacilityIntoDb,
  getAllFacilityFromDB,
  getFacilityFromDbB,
  updateFacilityIntoDB,
};
