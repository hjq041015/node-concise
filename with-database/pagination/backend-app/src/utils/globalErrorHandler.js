import { sendJsonResponse } from "./responseHelper.js";

export default function (err, _req, res, next) {
  const {
    name = "unkownError",
    statusCode = 500,
    message = "Something went wrong",
  } = err;

  return sendJsonResponse(res, statusCode, message);
}
