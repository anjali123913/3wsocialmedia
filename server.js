import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000", // React local dev
      "http://localhost:5173", // Vite local dev
      "https://roaring-khapse-383869.netlify.app", // your deployed frontend
    ],
    credentials: true, // if using cookies/auth headers
  })
);

app.use(express.json({ limit: "10mb" })); // allow image base64 prototypes

connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
