import { IUser } from "@/types";

type State = {
  users: IUser[];
};

type Action =
  | { type: "GET_USERS"; payload: IUser[] }
  | { type: "POST_USER"; payload: IUser }
  | { type: "PATCH_USER"; payload: IUser }
  | { type: "DELETE_USER"; payload: string | undefined }
  | {
      type: "CHANGE_STATUS_USER";
      payload: {
        _id: string;
        status: boolean;
      };
    };

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "POST_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "PATCH_USER":
      return {
        ...state,
        users: state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((item) => item._id !== action.payload),
      };
    case "CHANGE_STATUS_USER":
      return {
        ...state,
        users: state.users.map((item) =>
          item._id === action.payload._id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
