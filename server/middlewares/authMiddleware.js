import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt.js";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  ) {
    try {
      token = req?.headers?.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findOne({
        where: { user_id: decoded.id },
        attributes: { exclude: ["password"] },
      });

      console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("not Authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no token");
  }
};

export { protect };
