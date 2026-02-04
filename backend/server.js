import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();
dbConnect();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mini-social-post-application.vercel.app"
  ]
}));
app.use(express.json());

app.get("/", (_, res) => {
  res.send("api is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
