import { Request, Response } from "express";
import { User } from "../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generate.token";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 📝 REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 2️⃣ Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Generate JWT
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedToken;

    await user.save();

    res.status(200).json({
      status: "success",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    console.log("Incoming refresh:", refreshToken);
    console.log("Stored hash:", user.refreshToken);

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken!);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // 🔁 ROTATE refresh token
    const hashedNewToken = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedNewToken;

    await user.save();

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
// LOGOUT USER
export const logoutUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.refreshToken = null as any;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
