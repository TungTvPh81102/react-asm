import User from "../models/Auth";
import { hashPassword } from "../utils/hashPassword";

export const getAllUser = async (req, res, next) => {
  try {
    const data = await User.find().sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Danh sách người dùng có trên hệ thống",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailUser = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng",
      });
    }

    const { password, ...others } = data._doc;

    return res.status(200).json({
      status: true,
      message: "Thông tin người dùng: " + data.name,
      others,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(404).json({
        status: false,
        errors: "Tài khoản đã tồn tại trên hệ thống",
      });
    }

    const password = hashPassword(req.body.password);

    const data = await User.create({
      ...req.body,
      password,
    });

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Thêm người dùng thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, ...updateData } = req.body;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({
        status: false,
        message: "Người dùng không tồn tại",
      });
    }

    if (email && email !== userToUpdate.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          status: false,
          errors: "Email đã tồn tại, vui lòng chọn email khác",
        });
      }
    }

    const data = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cập nhật thông tin thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const changeStatusUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng",
      });
    }

    const data = await User.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cập nhật trạng thái thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy người dùng",
      });
    }

    const data = await User.findOneAndDelete({ _id: id });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Xóa người dùng thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};
