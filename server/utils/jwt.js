import jwt from "jsonwebtoken";

export const JWT_SECRET = "jsonwebtokensecret";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
