import * as jose from "jose";
import AppError from "./AppError.js";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(data) {
  const token = await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("40s")
    .sign(secret);

  return token;
}

export async function verifyToken(token) {
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    throw new AppError(`Invalid token`, 401, "Unauthorized");
  }
}
