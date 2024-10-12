import Order from "../models/Order";
import Cart from "../models/Cart";

export const getAll = async (req, res, next) => {
  try {
    const data = await Order.find()
      .populate("user_id", "name email")
      .populate({
        path: "products.product_id",
        select: "name price thumbnail",
      })
      .sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Danh sách đơn hàng trên hệ thống",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getDetail = async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id)
      .populate("user_id", "name email")
      .populate({
        path: "products.product_id",
        select: "name price thumbnail",
      });

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Chi tiết đơn hàng:" + data._id,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    const order = new Order({
      ...req.body,
      products: cart.products,
      total: cart.totalPrice,
    });

    await order.save();

    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Có lỗi xảy ra, vui lòng thử lại",
      });
    }

    cart.products = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({
      status: true,
      message: "Đặt hàng thành công",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const data = await Order.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    if (data.delivery === "SUCCESS_DELIVERY") {
      return res.status(400).json({
        status: false,
        message:
          "Đơn hàng đã được giao thành công và không thể cập nhật thông tin.",
      });
    }

    const currentStatusDelivery = data.delivery;
    const newStatusDelivery = req.body.delivery;

    const deliveredStatuses = ["DELIVERING", "DELIVERED", "SUCCESS_DELIVERY"];

    if (
      deliveredStatuses.includes(currentStatusDelivery) &&
      newStatusDelivery === "CANCELLED"
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Không thể hủy đơn hàng khi đang vận chuyển hoặc đã giao hàng thành công",
      });
    }

    if (
      currentStatusDelivery === "CANCELLED" &&
      ["PROCESSING", "DELIVERING", "DELIVERED", "SUCCESS_DELIVERY"].includes(
        newStatusDelivery
      )
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Không thể cập nhật thông tin vì đơn hàng có thể được giao thành công hoặc đã bi hủy",
      });
    }

    const newData = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "Cập nhật đơn hàng thành công",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.body.user_id;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ user_id: userId })
      .populate("user_id", "name email")
      .populate({
        path: "products.product_id",
        select: "name price thumbnail",
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No orders found for this user",
      });
    }

    return res.status(200).json({
      status: true,
      message: "List of orders for the user",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
