import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.js";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req?.headers?.authorization &&
      req?.headers?.authorization.startsWith("Bearer")
    ) {
      token = req?.headers?.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      throw new Error("Not Authorized, no token");
    }
  } catch (error) {
    res.status(401).json({ error: error.message || "Unauthorized" });
  }
};

export { protect };
