import { successResponse, errorResponse } from "../utils/response.js";
import { sendEmailOTP } from "../services/emailotp.service.js";
import { sendMobileOTP } from "../services/mobileotp.service.js";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { generateToken, generateOTP } from "../services/jwt.service.js";
import { Token } from "../models/token.model.js";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

export const signInFunction = async (req, res) => {
  const segments = req.path.split('/');
  const role = segments[1]; 
  const { login_key, otp } = req.body;

  let type;
  if (emailRegex.test(login_key)) {
    type = "email";
  } else if (mobileRegex.test(login_key)) {
    type = "mobile";
  } else {
    return errorResponse(res, "Invalid login key format", 400);
  }

  try {
    // Verify OTP
    const otpRecord = await Otp.findOne({
      field_value: login_key,
      type: type,
      otp: otp,
      otp_status: "pending",
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return errorResponse(res, "Invalid or expired OTP", 401);
    }

    // Expire used OTP
    await Otp.findByIdAndUpdate(
      otpRecord._id,
      { otp_status: "expired" },
      { new: true }
    );

    // Check if user exists
    let findUser = await User.findOne({
      [type]: login_key,
      role: role,
    });
    // Prevent admin auto-signup
    if (!findUser) {
      if (role === "admin") {
        return errorResponse(res, "Admin accounts must be created manually", 403);
      }
      if(type == "email"){
           if (login_key == process.env.EMAIL) {
            return errorResponse(res, "Invalid or unauthorized mobile number", 403);
          }
      }

      if(type == "mobile"){
           if (login_key == process.env.MOBILE) {
            return errorResponse(res, "Invalid or unauthorized mobile number", 403);
          }
      }
      // Create new user
      const newUser = new User({
        [type]: login_key,
        role: role,
      });
      await newUser.save();

      findUser = newUser;
    }

    // Construct user object
    const user = {
      id: findUser._id,
      name: findUser.name || "Guest",
      email: findUser.email || null,
      mobile: findUser.mobile || null,
      picture: findUser.picture || null,
      role: findUser.role || null,
    };

    // Expire old tokens
    await Token.updateMany(
      { userID: findUser._id },
      { token_status: "expired" }
    );

    // Generate new token
    const getToken = generateToken(user);
    if (getToken) {
      const token = new Token({
        userID: findUser._id,
        token: getToken,
      });
      await token.save();

      return successResponse(res, "Sign-in successful", {
        user,
        token: getToken,
      });
    } else {
      return errorResponse(res, "Invalid credentials", 401);
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return errorResponse(res, "Sign-in failed", 500);
  }
}

export const sendOtp = async (req, res) => {
  const { login_key } = req.body;
  try {
    // const gen_otp = generateOTP();
    const gen_otp = "123456";
    if (emailRegex.test(login_key)) {
      if (sendEmailOTP(login_key, gen_otp)) {
        const expireAllotp = await Otp.updateMany(
          { field_value: login_key, type: "email" },
          { otp_status: "expired" }
        );
        const otp = new Otp({
          field_value: login_key,
          otp: gen_otp,
          type: "email",
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
        });
        await otp.save();
      }
    } else if (mobileRegex.test(login_key)) {
      if (sendMobileOTP(login_key, gen_otp)) {
        const expireAllotp = await Otp.updateMany(
          { field_value: login_key, type: "mobile" },
          { otp_status: "expired" }
        );
        const otp = new Otp({
          field_value: login_key,
          otp: gen_otp,
          type: "mobile",
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
        });
        await otp.save();
      }
    } else {
      return errorResponse(res, "Invalid login key format", 400);
    }
    successResponse(res, "OTP sent successfully", login_key, 200);
    return;
  } catch (error) {
    errorResponse(res, "Failed to send OTP", 500);
    return;
  }
};
