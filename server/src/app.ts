import express from "express";
import healthRoute from "./routes/health.route";
import { errorHandler } from "./middleware/error.middleware";
import patientRoutes from "./routes/patient.route";
import authRoutes from "./routes/auth.route";

const app = express();
app.get("/test", (req, res) => {
  res.send("Test route works");
});
app.use(express.json());

app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoute);

app.use(errorHandler);



export default app;
