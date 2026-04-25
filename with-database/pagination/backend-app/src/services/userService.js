import bcrpyt from "bcrypt";
import User from "../models/userModel.js";

export async function createUsers(email, password) {
  const encryptedPassword = await bcrpyt.hash(password, 10);

  const createdUser = await User.create({
    id: Date.now(),
    email,
    password: encryptedPassword,
  });

  return createdUser;
}

export async function verifyUser(email, password) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  const result = await bcrpyt.compare(password, user.password);

  return result;
}
