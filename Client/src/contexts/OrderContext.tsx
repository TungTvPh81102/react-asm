import api from "@/api";
import orderReducer from "@/reducer/orderReducer";
import { IOrder } from "@/types";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type OrderContextType = {
  state: {
    orders: IOrder[];
  };
  handleOrder: (order: IOrder) => void;
};

export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType
);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
  });

  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/order");
      dispatch({
        type: "GET_ORDERS",
        payload: data.data,
      });
    })();
  }, []);

  const handleOrder = async (order: IOrder) => {
    try {
      console.log(order);
      if (order._id) {
        const { _id, ...dataUpdate } = order;
        const { data } = await api.patch(`/order/${_id}`, dataUpdate);
        dispatch({
          type: "PATCH_ORDER",
          payload: data.data,
        });
        toast.success("Cập nhật đơn hàng thành công");
      } else {
        const { data } = await api.post("/order", order);
        dispatch({
          type: "POST_ORDER",
          payload: data.data,
        });
        toast.success("Thanh toán đơn hàng thành công");
        nav("orders/success");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <OrderContext.Provider value={{ state, handleOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
