import express from "express";
import { createPatient, getPatients,getPatientById,
  updatePatient,
  deletePatient, } from "../controllers/patient.controller";
  import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", createPatient);
router.get("/:id", getPatientById);
router.get("/", protect, getPatients);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
export default router;
