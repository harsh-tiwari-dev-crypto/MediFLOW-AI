import express from "express";
import { createPatient, getPatients,getPatientById,
  updatePatient,
  deletePatient, } from "../controllers/patient.controller";
  import { protect, authorizeRoles } from "../middleware/auth.middleware";
  import { validate } from "../middleware/validate.middleware";
import { patientSchema } from "../validators/patient.validator";


const router = express.Router();

router.use(protect);

router.post("/", validate(patientSchema), createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", authorizeRoles("admin"), deletePatient);

export default router;