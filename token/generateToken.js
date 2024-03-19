import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user_id) => {
  const token = Jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export default generateToken;
