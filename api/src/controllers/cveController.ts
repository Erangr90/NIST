import { Request, Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import CVE from "../models/CVE"

export const getCVE = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.params.page as string) || 1
  const limit = 20
  const skip = (page - 1) * limit

  const cves = await CVE.find().skip(skip).limit(limit).sort({ published: -1 })
  res.status(200).json(cves)
})

export const getCVEById = asyncHandler(async (req: Request, res: Response) => {
  const cveId = req.params.cveId as string
  const cve = await CVE.findOne({ cveId })
  res.status(200).json(cve)
})
