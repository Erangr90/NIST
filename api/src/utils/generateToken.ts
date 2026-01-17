import jwt from "jsonwebtoken"
import { Response } from "express"
import dotenv from "dotenv"
dotenv.config()

// Ensure JWT_SECRET is set and has minimum length
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET must be set in environment variables and be at least 32 characters long"
  )
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_ALGORITHM = "HS256" // Explicitly set algorithm to prevent algorithm confusion attacks
const ACCESS_TOKEN_EXPIRY = "15m" // Short-lived access token
const REFRESH_TOKEN_EXPIRY = "30d" // Long-lived refresh token

interface TokenPayload {
  userId: string
  type?: "access" | "refresh"
}

/**
 * Generate secure JWT token with explicit algorithm
 */
const generateToken = (res: Response, userId: string) => {
  // Generate access token
  const accessToken = jwt.sign({ userId, type: "access" }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })

  // Generate refresh token
  const refreshToken = jwt.sign({ userId, type: "refresh" }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: REFRESH_TOKEN_EXPIRY,
  })

  // Set access token as HTTP-Only cookie
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  })

  // Set refresh token as HTTP-Only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/api/auth/refresh", // Only send refresh token to refresh endpoint
  })

  return { accessToken, refreshToken }
}

/**
 * Verify JWT token with explicit algorithm
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM], // Explicitly specify allowed algorithms
    }) as TokenPayload

    return decoded
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired")
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token")
    }
    throw new Error("Token verification failed")
  }
}

/**
 * Generate new access token from refresh token
 */
export const refreshAccessToken = (refreshToken: string): string => {
  const decoded = verifyToken(refreshToken)

  if (decoded.type !== "refresh") {
    throw new Error("Invalid token type")
  }

  return jwt.sign({ userId: decoded.userId, type: "access" }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })
}

export default generateToken
