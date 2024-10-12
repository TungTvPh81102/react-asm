import Cart from "../models/Cart";
import Product from "../models/Product";
export const getAll = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await Cart.find({
      user_id: userId,
    })
      .populate("products.product_id", "id name price slug thumbnail discount")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "Danh sách giỏ hàng của người dùng",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({
        user_id,
        products: [],
        totalPrice: 0,
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (productIndex === -1) {
      cart.products.push({ product_id, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }

    cart.totalPrice += product.price * quantity;

    await cart.save();

    return res.status(201).json({
      status: true,
      message: "Cập nhật giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeCart = async (req, res, next) => {
  try {
    const { user_id, product_id } = req.body;

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy giỏ hàng",
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (productIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Sản phẩm không có trong giỏ hàng",
      });
    }

    const product = cart.products[productIndex];
    const productCollection = await Product.findById(product_id);
    cart.totalPrice -= product.quantity * productCollection.price;

    cart.products.splice(productIndex, 1);

    if (cart.products.length === 0) {
      await Cart.deleteOne({ user_id });
    } else {
      await cart.save();
    }

    return res.status(200).json({
      status: true,
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
// export const update = async (req, res, next) => {
//   try {
//     const { user_id, product_id, quantity } = req.body;

//     const cart = await Cart.findOne({ user_id: user_id });

//     if (!cart) {
//       return res.status(404).json({
//         status: false,
//         message: "Không tìm thấy giỏ hàng",
//       });
//     }

//     const product = await Product.findById(product_id);
//     console.log(product);

//     if (!product) {
//       return res.status(404).json({
//         status: false,
//         message: "Không tìm thấy sản phẩm",
//       });
//     }

//     const findIndex = cart.products.findIndex(
//       (item) => item.product_id.toString() === product_id
//     );

//     if (findIndex === -1) {
//       cart.products.push({ product_id, quantity });
//     } else {
//       cart.products[findIndex].quantity += quantity;
//     }

//     // let newProductCart = [];

//     // if (productExisted) {
//     //   newProductCart = cartExits.products.map((item) =>
//     //     item.product_id.toString() === product_id
//     //       ? { product_id, quantity: item.quantity + quantity }
//     //       : item
//     //   );
//     // } else {
//     //   newProductCart = [...cartExits.products, { product_id, quantity }];
//     // }

//     // cartExits.products = newProductCart;
//     await cart.save();

//     return res.status(200).json({
//       status: true,
//       message: "Cập nhật giỏ hàng thành công",
//       data: cartExits,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
