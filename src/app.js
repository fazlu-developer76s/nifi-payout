import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from "./db/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import providerRouter from "./routes/provider.routes.js";
import { User } from "./models/user.model.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
try {
  const findAdmin = await User.findOne({ role: "admin" });
  if(!findAdmin) {
    await User.create({
      name:"Admin",
      role: "admin",
      mobile: process.env.MOBILE,
      email: process.env.EMAIL,
      user_status: "active", 
    });
    console.log("Admin created successfully");
  }
} catch (err) {
  console.error("Error creating role:", err);
}
app.get("/", async (req, res) => {
    res.send("hello welcome to nifi payout api");
});


app.use("/api", authRouter);
app.use("/api", authRouter);
app.use("/api", providerRouter);
export default app;
