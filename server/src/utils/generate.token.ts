import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import crypto from "crypto";

export const generateAccessToken = (user: IUserDocument) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (user: IUserDocument) => {
  return jwt.sign(
    {
      id: user._id,
      jti: crypto.randomUUID(),
    },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
  
};