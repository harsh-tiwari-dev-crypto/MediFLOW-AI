import  {Patient} from "../models/patient.model";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

interface GetPatientsParams {
  page: number;
  limit: number;
  search?: string | undefined;
  gender?: string | undefined;
  minAge?: number | undefined;
  maxAge?: number | undefined;
}

export const createPatientService = async (data: any) => {
  return await Patient.create(data);
};

export const getAllPatientsService = async ({
  page,
  limit,
  search,
  gender,
  minAge,
  maxAge,
}: GetPatientsParams) => {

  const skip = (page - 1) * limit;

  const filter: any = {};

  // 🔍 Search by name (case insensitive)
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  // 👤 Filter by gender
  if (gender) {
    filter.gender = gender;
  }

  // 🎯 Filter by age range
  if (minAge !== undefined || maxAge !== undefined) {
    filter.age = {};

    if (minAge !== undefined) {
      filter.age.$gte = minAge;
    }

    if (maxAge !== undefined) {
      filter.age.$lte = maxAge;
    }
  }

  const patients = await Patient.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Patient.countDocuments(filter);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data: patients,
  };
};

export const getPatientByIdService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  const patient = await Patient.findById(id);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};

export const updatePatientService = async (id: string, data: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  const updated = await Patient.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new AppError("Patient not found", 404);
  }

  return updated;
};

export const deletePatientService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid ID", 400);
  }

  const deleted = await Patient.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError("Patient not found", 404);
  }

  return deleted;
};