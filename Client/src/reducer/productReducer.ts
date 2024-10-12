import { IProduct } from "@/types";

type State = {
  products: IProduct[];
  dataNotFound: boolean;
};

type Action =
  | { type: "GET_PRODUCTS"; payload: IProduct[] }
  | { type: "SET_SELECTED_PRODUCT"; payload: IProduct }
  | { type: "POST_PRODUCT"; payload: IProduct }
  | { type: "PATCH_PRODUCT"; payload: IProduct }
  | { type: "DELETE_PRODUCT"; payload: string | undefined }
  | {
      type: "CHANGE_STATUS_PRODUCT";
      payload: { _id: string; status: boolean };
    }
  | { type: "SET_DATA_NOT_FOUND"; payload: boolean };

const productReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        dataNotFound: action.payload.length === 0,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "PATCH_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
      };
    case "CHANGE_STATUS_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === action.payload._id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProduct: state.products.find(
          (item) => item.slug === action.payload.slug
        ),
      };
    case "SET_DATA_NOT_FOUND":
      return {
        ...state,
        dataNotFound: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
