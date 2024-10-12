import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: Boolean,
      default: 1,
    },
    delivery: {
      type: String,
      default: "Đang xử lý",
    },
    total: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
