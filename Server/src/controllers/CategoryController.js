import Category from "../models/Category";
import { generateSlug } from "../utils/renderSlug";

export const getAllCategory = async (req, res, next) => {
  try {
    const data = await Category.find().sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Danh sách danh mục trên hệ thống",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Chi tiết danh mục: " + data.name,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const slug = generateSlug(req.body.name);
    const data = await Category.create({ ...req.body, slug });

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Thêm mới danh mục thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục",
      });
    }

    const slug = generateSlug(req.body.name);

    const data = await Category.findByIdAndUpdate(
      id,
      { ...req.body, slug },
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
      message: "Cập nhật danh mục thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const changeStatusCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục",
      });
    }

    const data = await Category.findByIdAndUpdate(
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

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy danh mục",
      });
    }

    const data = await Category.findOneAndDelete({ _id: id });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Xóa danh mục thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};
