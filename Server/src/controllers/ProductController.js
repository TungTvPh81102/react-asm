import Product from "../models/Product";
import Category from "../models/Category";
import { generateSlug } from "../utils/renderSlug";
import diacritics from "diacritics";

export const getAllProduct = async (req, res, next) => {
  try {
    const { search, categorySlug, sort } = req.query;

    let filter = {};

    if (search) {
      const searchTerm = search.trim().toLowerCase();

      filter.name = {
        $regex: searchTerm,
        $options: "i",
      };
    }

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug }).select(
        "_id"
      );
      if (category) {
        filter.category_id = category._id;
      } else {
        return res.status(404).json({
          status: false,
          message: "Category not found",
        });
      }
    }

    let sortOption = {};
    if (sort === "priceAsc") {
      sortOption.price = 1;
    } else if (sort === "priceDesc") {
      sortOption.price = -1;
    } else if (sort === "nameAsc") {
      sortOption.name = 1;
    } else if (sort === "nameDesc") {
      sortOption.name = -1;
    } else {
      sortOption.createdAt = -1;
    }

    const data = await Product.find(filter)
      .populate("category_id", "_id name")
      .sort(sortOption);

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "List of products",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetailProduct = async (req, res) => {
  try {
    const data = await Product.findOne({ slug: req.params.slug }).populate(
      "category_id",
      "_id name"
    );

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Chi tiết sản phẩm: " + data.name,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const slug = generateSlug(req.body.name);

    const data = await Product.create({ ...req.body, slug });

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Thêm mới sản phẩm thành công",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    const newSlug = generateSlug(req.body.name);

    const data = await Product.findOneAndUpdate(
      { slug },
      { ...req.body, slug: newSlug },
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
      message: "Cập nhật sản phẩm thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const changeStatusProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    const data = await Product.findByIdAndUpdate(
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

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    const data = await Product.findOneAndDelete({ _id: id });

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Xóa sản phẩm thành công",
      data,
    });
  } catch (error) {
    next(error);
  }
};
