import express from "express";
import healthRoute from "./routes/health.route";
import patientRoutes from "./routes/patient.route";
import authRoutes from "./routes/auth.route";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoute);

app.use(globalErrorHandler);



export default app;
