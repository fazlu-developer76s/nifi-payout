import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
      // userID: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    baseUrl: String,
    userName: String,
    password: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    code: String,
    provider_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },

  {
    timestamps: true,
  }
);

export const Provider = mongoose.model("Provider", providerSchema);
