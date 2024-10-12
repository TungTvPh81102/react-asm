import api from "@/api";
import userReducer from "@/reducer/userReducer";
import { IUser } from "@/types";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type UserContextType = {
  state: {
    users: IUser[];
  };
  handleSubmitUser: (user: IUser) => void;
  handleChangeStatus: (id: string | undefined, status: boolean) => void;
  handleRemove: (id: string | undefined) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/users");
      dispatch({
        type: "GET_USERS",
        payload: data.data,
      });
    })();
  }, []);

  const handleSubmitUser = async (user: IUser) => {
    try {
      if (user._id) {
        const { _id, ...dataUpdate } = user;
        const { data } = await api.patch(`/users/${_id}`, dataUpdate);
        dispatch({
          type: "PATCH_USER",
          payload: data.data,
        });
        toast.success(data.message);
      } else {
        const { data } = await api.post("/users", user);
        dispatch({
          type: "POST_USER",
          payload: data.data,
        });
        toast.success(data.message);
      }
      nav("/admin/users");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const handleChangeStatus = async (
    id: string | undefined,
    status: boolean
  ) => {
    try {
      Swal.fire({
        title: "Are update status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await api.put(`/users/${id}/status`, {
            status: !status,
          });
          const updateUser = data.data;
          dispatch({
            type: "CHANGE_STATUS_USER",
            payload: updateUser,
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui loại thực hiện");
    }
  };
  const handleRemove = async (id: string | undefined) => {
    try {
      Swal.fire({
        title: "Are update status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await api.delete(`/users/${id}`);
          console.log(data);
          dispatch({
            type: "DELETE_USER",
            payload: id,
          });
          toast.success(data.message);
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui loại thực hiện");
    }
  };

  return (
    <UserContext.Provider
      value={{ state, handleSubmitUser, handleChangeStatus, handleRemove }}
    >
      {children}
    </UserContext.Provider>
  );
};
