import express from "express";
import app from "./app";
import { PORT } from "./config/env";
import { connectDB } from "./config/db";
// Connect to MongoDB   
connectDB();




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



