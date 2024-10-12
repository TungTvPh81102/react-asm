import api from "@/api";
import cartReducer from "@/reducer/cartReducer";
import { ICart } from "@/types";
import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type CartContextType = {
  state: {
    carts: ICart[];
  };
  addToCart: (data: ICart) => void;
  handleDelete: (id: string | undefined, user_id?: string) => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    carts: [],
  });

  const nav = useNavigate();

  const { user } = useContext(AuthContext) as AuthContextType;
  const userId = user?._id;

  const fetchCart = async () => {
    try {
      const { data } = await api.get(`/cart/view-cart`);
      dispatch({
        type: "GET_CARTS",
        payload: data.data,
      });
    } catch (error) {
      toast.error("Failed to load cart data.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const addToCart = async (data: ICart) => {
    try {
      const { data: newData } = await api.post("/cart/add-cart", data);
      dispatch({
        type: "POST_CART",
        payload: newData.data,
      });
      toast.success("Thêm vào giỏ hàng thành công");
      nav("view-cart");
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại lại");
    }
  };

  const handleDelete = async (id: string | undefined, user_id?: string) => {
    try {
      const { data } = await api.post(`/cart/remove-cart`, {
        product_id: id,
        user_id: user_id,
      });
      dispatch({ type: "DELETE_CART", payload: data.data });
      toast.success("Xóa sản phẩm từ giỏ hàng thành công");
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui loại thực hiện");
    }
  };

  return (
    <CartContext.Provider value={{ state, addToCart, handleDelete }}>
      {children}
    </CartContext.Provider>
  );
};
