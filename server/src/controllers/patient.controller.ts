import { Request, Response } from "express";
import { Patient } from "../models/patient.model";

// CREATE PATIENT
export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error: any) {
    console.log("CREATE ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PATIENTS
export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
    });
  }
};

// GET SINGLE PATIENT
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};

// UPDATE PATIENT
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Update failed",
    });
  }
};

// DELETE PATIENT
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Delete failed",
    });
  }
};
