import { Response, NextFunction } from "express"
import AuthRequest from "../types/authRequest"
import { verifyToken } from "../utils/generateToken"
import User, { Role } from "../models/User"

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt

    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" })
      return
    }

    const decoded = verifyToken(token)

    if (decoded.type !== "access") {
      res.status(401).json({ message: "Invalid token type" })
      return
    }

    req.user = await User.findById(decoded.userId).select("-password")
    next()
  } catch (error: any) {
    res
      .status(401)
      .json({ message: error.message || "Not authorized, token failed" })
  }
}

export const admin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== Role.Admin) {
    res.status(401).json({ message: "Not authorized, admin only" })
    return
  }
  next()
}

export const superAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== Role.SuperAdmin) {
    res.status(401).json({ message: "Not authorized, super admin only" })
    return
  }
  next()
}
