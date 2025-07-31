import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { errorResponse } from "../utils/response.js";

const JWT_SECRET = process.env.JWT_SECRET;

 const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Validate Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Authorization header is missing or invalid", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Decode JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Validate token existence in DB
    const token_status = await Token.findOne({
      token: token,
      userID: decoded.id,
      role: decoded.role,
      token_status: "active"
    });

    if (!token_status) {
      return errorResponse(res, "Token is not valid or has expired", 401);
    }

    // 4. Block role-based access
    const segments = req.path.split('/').filter(Boolean);
    const area = segments[1]; // 'admin' or 'user'
    return console.log(area);
    if (area === 'admin' && decoded.role !== 'admin') {
      return errorResponse(res, "Unauthorized: Admin access only", 403);
    }

    if (area === 'user' && decoded.role !== 'user') {
      return errorResponse(res, "Unauthorized: User access only", 403);
    }

    // 5. Attach decoded user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return errorResponse(res, "Token verification failed", 401);
  }
  
};
export default verifyToken;
