import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/errorsMiddlewares";

// import routes
import authRoutes from "./routes/authRoutes";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);

// Errors Handlers
app.use(notFound);
app.use(errorHandler);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
