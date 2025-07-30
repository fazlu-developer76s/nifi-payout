import { errorResponse } from "../utils/response.js";
const validationCheck = (schema) => async (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
      // type: detail.type,
    }));
    return errorResponse(
      res,
      "Validation failed",
      400,
      errorDetails
    );
  
  }
  next();
};
export default validationCheck;
