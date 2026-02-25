import { Request, Response } from "express";
import {
  createPatientService,
  getAllPatientsService,
  getPatientByIdService,
  updatePatientService,
  deletePatientService,
} from "../services/patient.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createPatient = asyncHandler(
  async (req: Request, res: Response) => {
    const patient = await createPatientService(req.body);

    return res
      .status(201)
      .json(new ApiResponse(true, "Patient created successfully", patient));
  },
);

// GET ALL PATIENTS

export const getPatients = asyncHandler(async (req: Request, res: Response) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 5;

  if (page < 1) page = 1;
  if (limit < 1) limit = 5;
  if (limit > 100) limit = 100;

  const search = req.query.search ? String(req.query.search) : undefined;

  const gender = req.query.gender ? String(req.query.gender) : undefined;

  const minAge = req.query.minAge
    ? parseInt(req.query.minAge as string)
    : undefined;

  const maxAge = req.query.maxAge
    ? parseInt(req.query.maxAge as string)
    : undefined;



  const result = await getAllPatientsService({
    page,
    limit,
    search,
    gender,
    minAge,
    maxAge,
  });

  return res
    .status(200)
    .json(new ApiResponse(true, "Patients fetched successfully", result));
});

// GET SINGLE PATIENT

export const getPatientById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await getPatientByIdService(id as string);

    res
      .status(200)
      .json(new ApiResponse(true, "Patient fetched successfully", patient));
  },
);

// UPDATE PATIENT
export const updatePatient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await updatePatientService(id as string, req.body);

    res
      .status(200)
      .json(new ApiResponse(true, "Patient updated successfully", updated));
  },
);

// DELETE PATIENT
export const deletePatient = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await deletePatientService(id as string);

    res
      .status(200)
      .json(new ApiResponse(true, "Patient deleted successfully", {}));
  },
);
