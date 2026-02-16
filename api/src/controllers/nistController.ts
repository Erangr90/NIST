import { Request, Response } from "express"
import asyncHandler from "../middlewares/asyncHandler"
import axios from "axios"
import fs from "fs"
import path from "path"

const outputDir = path.join(process.cwd(), "data")
const filePath = path.join(outputDir, "data.json")

const NIST_API_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"

export const getNistData = asyncHandler(async (req: Request, res: Response) => {
  const { data } = await axios.get(NIST_API_URL)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const jsonContent = JSON.stringify(data["vulnerabilities"], null, 2)

  fs.writeFileSync(filePath, jsonContent, "utf8")

  console.log("JSON file saved:", filePath)

  res.status(200).json(data)
})
