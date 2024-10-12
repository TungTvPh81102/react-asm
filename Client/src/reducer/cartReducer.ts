import { ICart } from "@/types";

type State = {
  carts: ICart[];
};

type Action =
  | { type: "GET_CARTS"; payload: ICart[] }
  | { type: "POST_CART"; payload: ICart }
  | { type: "PUT_CART"; payload: ICart }
  | { type: "DELETE_CART"; payload: string };

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GET_CARTS":
      return {
        ...state,
        carts: Array.isArray(action.payload) ? action.payload : [],
      };
    case "POST_CART":
      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    case "PUT_CART":
      return {
        ...state,
        carts: state.carts.map((cart) =>
          cart._id === action.payload._id ? action.payload : cart
        ),
      };
    case "DELETE_CART":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart._id !== action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
