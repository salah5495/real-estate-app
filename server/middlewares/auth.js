import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "inavlid or expired token" });
  }
};
