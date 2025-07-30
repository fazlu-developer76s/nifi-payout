function successResponse(res, message, data = {}, statusCode = 200) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function errorResponse(res, message, statusCode = 400, errors = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

export { successResponse, errorResponse };
