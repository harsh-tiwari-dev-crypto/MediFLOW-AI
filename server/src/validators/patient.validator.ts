import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  age: z.coerce.number().min(0, "Age must be positive"),
  gender: z.enum(["male", "female", "other"]),
  disease: z.string().min(3, "Disease must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
});