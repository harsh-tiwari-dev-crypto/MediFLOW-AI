import  {Patient} from "../models/patient.model";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

export const createPatientService = async (data: any) => {
  return await Patient.create(data);
};

export const getAllPatientsService = async () => {
  return await Patient.find();
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