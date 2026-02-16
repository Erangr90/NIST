import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middlewares/errorsMiddlewares"
import connectDB from "./config/db"
// import routes
import nistRoutes from "./routes/nistRoutes"
import cveRoutes from "./routes/cveRoutes"

const app = express()

dotenv.config()
const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Connect to MongoDB
connectDB()

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" })
})

// Routes
app.use("/nist", nistRoutes)
app.use("/cve", cveRoutes)
// Errors Handlers
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(port as number, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`)
})
