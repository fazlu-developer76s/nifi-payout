import mongoose, { get } from "mongoose";
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      trim: true
    },
    field_value: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["email", "mobile"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    otp_status: {
      type: String,
      enum: ["pending", "verified", "expired"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export const Otp = mongoose.model("Otp", otpSchema);
