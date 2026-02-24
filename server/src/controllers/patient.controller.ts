import { Request, Response } from "express";
import {
  createPatientService,
  getAllPatientsService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService
} from "../services/patient.service";


export const createPatient = async (req: Request, res: Response) => {
  const patient = await createPatientService(req.body);

  res.status(201).json({
    success: true,
    data: patient,
  });
};

// GET ALL PATIENTS

export const getPatients = async (req: Request, res: Response) => {
  const patients = await getAllPatientsService();

  res.status(200).json({
    success: true,
    data: patients,
  });
};


// GET SINGLE PATIENT

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = await getPatientByIdService(id as string);

  res.status(200).json({
    success: true,
    data: patient,
  });
};


// UPDATE PATIENT
export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await updatePatientService(id as string, req.body);

  res.status(200).json({
    success: true,
    data: updated,
  });
};

// DELETE PATIENT
export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deletePatientService(id as string);

  res.status(200).json({
    success: true,
    message: "Patient deleted successfully",
  });
};

