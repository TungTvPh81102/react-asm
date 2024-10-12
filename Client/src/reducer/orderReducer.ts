import { IOrder } from "@/types";

type State = {
  orders: IOrder[];
};

type Action =
  | { type: "GET_ORDERS"; payload: IOrder[] }
  | { type: "POST_ORDER"; payload: IOrder }
  | { type: "PATCH_ORDER"; payload: IOrder };

const orderReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "POST_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "PATCH_ORDER":
      return {
        ...state,
        orders: state.orders.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export default orderReducer;
