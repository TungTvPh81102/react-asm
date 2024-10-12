import { ICategory } from "@/types";

type State = {
  categories: ICategory[];
};

type Action =
  | { type: "GET_CATEGORIES"; payload: ICategory[] }
  | { type: "POST_CATEGORY"; payload: ICategory }
  | { type: "PATCH_CATEGORY"; payload: ICategory }
  | { type: "DELETE_CATEGORY"; payload: string | undefined }
  | {
      type: "CHANGE_STATUS_CATEGORY";
      payload: { _id: string; status: boolean };
    };

const categoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "POST_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "PATCH_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "CHANGE_STATUS_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((item) =>
          item._id === action.payload._id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;
