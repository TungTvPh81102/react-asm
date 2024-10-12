import Auth from "../models/Auth.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn không có quyền truy cập, vui lòng thử lại",
      });
    }

    const decode = verifyToken(token);
    if (!decode) {
      return res.status(401).json({
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }

    const user = await Auth.findById(decode._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Bạn không có quyền truy cập, vui lòng thử lại",
    });
  }
};
