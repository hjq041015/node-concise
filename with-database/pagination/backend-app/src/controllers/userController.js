import AppError from "../utils/appError.js";
import {
  createUsers as createUsersApi,
  verifyUser,
} from "../services/userService.js";
import {
  sendJsonResponse,
  sendSuccessResponse,
} from "../utils/responseHelper.js";
import { generateToken } from "../utils/jwtHelper.js";

export async function createUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, "Bad request");
  }

  const createdUser = await createUsersApi(email, password);

  return sendSuccessResponse(res, createdUser);
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(`Email and password are required`, 400, "Bad request");
  }

  const result = await verifyUser(email, password);

  if (!result) {
    return sendJsonResponse(res, 401, "Unauthorized");
  }

  const token = await generateToken(email);

  return sendSuccessResponse(res, token);
}
