import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import generateToken, { refreshAccessToken } from "../utils/generateToken";
import User from "../models/User";
import { registerSchema, loginSchema } from "../validations/user";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = registerSchema.safeParse({
    email: email?.trim() || "",
    password: password?.trim() || "",
    name: name?.trim() || ""
  });
  if (!result.success) {
    const errors = [];
    for (const error of result.error.issues) {
      errors.push(error.message);
    }
    res.status(400).json({ message: [...errors] });
    return;
  }

  const userExists = await User.findOne({ email: email.trim() });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await User.create({
    name: name.trim(),
    email: email.trim(),
    password: password.trim()
  });

  if (user) {
    generateToken(res, user.id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(500);
    throw new Error("Database error");
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({
    email: email?.trim() || "",
    password: password?.trim() || ""
  });
  if (!result.success) {
    const errors = [];
    for (const error of result.error.issues) {
      errors.push(error.message);
    }
    res.status(400).json({ message: [...errors] });
    return;
  }

  const user = await User.findOne({ email: email.trim() });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user.id);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(400).json({ message: "Email or password is not valid" });
  }
});

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  res.status(200).json({ message: "Logged out successfully" });
};

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token not provided" });
    return;
  }

  try {
    const newAccessToken = refreshAccessToken(refreshToken);

    // Set new access token as HTTP-Only cookie
    res.cookie("jwt", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Invalid refresh token" });
  }
});
