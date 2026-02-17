import express from "express";
import healthRoute from "./routes/health.route";

const app = express();

app.use(express.json());

// THIS IS THE LINE YOU WERE LOOKING FOR
app.use("/api/health", healthRoute);

export default app;
