import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import { JWT_SECRET } from "../index.js";

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));

    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
