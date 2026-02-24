import express from "express";
import { createPatient, getPatients,getPatientById,
  updatePatient,
  deletePatient, } from "../controllers/patient.controller";
  import { protect, authorizeRoles } from "../middleware/auth.middleware";
  import { validate } from "../middleware/validate.middleware";
import { patientSchema } from "../validators/patient.validator";
import { asyncHandler } from "../utils/asyncHandler";


const router = express.Router();

router.use(protect);

router.post("/", validate(patientSchema), asyncHandler(createPatient));
router.get("/", asyncHandler(getPatients));
router.get("/:id", asyncHandler(getPatientById));
router.put("/:id", asyncHandler(updatePatient));
router.delete("/:id", authorizeRoles("admin"), asyncHandler(deletePatient));

export default router;