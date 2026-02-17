import express from "express";
import healthRoute from "./routes/health.route";
import { errorHandler } from "./middleware/error.middleware";
import patientRoutes from "./routes/patient.route";

const app = express();

app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/health", healthRoute);

app.use(errorHandler);



export default app;
