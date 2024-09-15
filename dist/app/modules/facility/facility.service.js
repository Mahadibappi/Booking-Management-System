"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityService = void 0;
const facility_model_1 = require("./facility.model");
const createFacilityIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilityData = Object.assign({}, payload);
        const facility = yield facility_model_1.Facility.create(facilityData);
        return facility;
    }
    catch (error) {
        console.log(error.message);
    }
});
// get all facility
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const facilities = yield facility_model_1.Facility.find();
    return facilities;
});
// Get single facility by ID
const getSingleFacilityFromDbB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facility = yield facility_model_1.Facility.findById(id);
        if (!facility) {
            throw new Error("Facility not found");
        }
        return facility;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updateFacilityIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield facility_model_1.Facility.findByIdAndUpdate(id, data, { new: true });
    if (!update) {
        throw new Error(`facility did't updated`);
    }
    return update;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const remove = yield facility_model_1.Facility.findByIdAndDelete(id);
    if (!remove) {
        throw new Error(`facility did't deleted`);
    }
    return remove;
});
exports.facilityService = {
    createFacilityIntoDb,
    getAllFacilityFromDB,
    getSingleFacilityFromDbB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
};
