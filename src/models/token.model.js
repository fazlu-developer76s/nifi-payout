import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema(
  {
        userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        token: {
        type: String,
        required: true,
        trim: true
        },
        token_status  :{
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        }
    },
    {
        timestamps: true,
    }
);
export const Token = mongoose.model("Token", tokenSchema);
