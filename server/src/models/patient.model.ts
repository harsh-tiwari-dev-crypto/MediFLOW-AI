import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    disease: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,
  },
);

export const Patient = mongoose.model("Patient", patientSchema);
