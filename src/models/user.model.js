import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
    },
    mobile: {
      type: String,
      default: null,
      required:true,
      trim: true,
    },
    picture: {
      type: String,
      default: null,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    user_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
