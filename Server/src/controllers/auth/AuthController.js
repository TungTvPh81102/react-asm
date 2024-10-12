import Auth from "../../models/Auth";
import { hashPassword, verifyPassword } from "../../utils/hashPassword";
import { generateToken } from "../../utils/jwt";

export const signUp = async (req, res, next) => {
  try {
    const password = hashPassword(req.body.password);

    const data = await Auth.create({ ...req.body, password });

    if (!data) {
      data.password = undefined;
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Tạo tài khoản thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: false,
        errors: "Không tìm thấy người dùng",
      });
    }

    const isMatch = verifyPassword(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        errors: "Mật khẩu không chính xác, vui lòng thử lại",
      });
    }

    const token = generateToken(
      {
        _id: user._id,
      },
      "1d"
    );

    user.password = undefined;

    return res.status(200).json({
      status: true,
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
