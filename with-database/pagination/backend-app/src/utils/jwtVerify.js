import { verifyToken } from "./jwtHelper.js";
import { sendJsonResponse } from "./responseHelper.js";

export default async function jwtVerify(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return sendJsonResponse(res, 401, "Unauthorized");
  }
  const token = authorization.split(" ")[1];
  await verifyToken(token);
  next();
}
