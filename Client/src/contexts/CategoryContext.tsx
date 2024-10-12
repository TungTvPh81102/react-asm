import api from "@/api";
import categoryReducer from "@/reducer/categoryReducer";
import { ICategory } from "@/types";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type CategoryContextType = {
  state: {
    categories: ICategory[];
  };
  handleSubmitCategory: (category: ICategory) => void;
  handleChangeStatus: (id: string | undefined, status: boolean) => void;
  handleRemove: (id: string | undefined) => void;
};

export const CategoryContext = createContext<CategoryContextType>(
  {} as CategoryContextType
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(categoryReducer, {
    categories: [],
  });

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/categories");
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.data,
      });
    })();
  }, []);

  const handleSubmitCategory = async (category: ICategory) => {
    try {
      if (category._id) {
        const { _id, ...dataUpdate } = category;
        const { data } = await api.patch(`/categories/${_id}`, dataUpdate);
        dispatch({
          type: "PATCH_CATEGORY",
          payload: data.data,
        });
        toast.success(data.message);
      } else {
        const { data } = await api.post("/categories", category);
        dispatch({
          type: "POST_CATEGORY",
          payload: data.data,
        });
        toast.success(data.message);
      }
      nav("/admin/categories");
    } catch (error) {
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
          const { data } = await api.put(`/categories/${id}/status`, {
            status: !status,
          });
          const updatedCategory = data.data;
          dispatch({
            type: "CHANGE_STATUS_CATEGORY",
            payload: updatedCategory,
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
          const { data } = await api.delete(`/categories/${id}`);
          console.log(data);
          dispatch({
            type: "DELETE_CATEGORY",
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
    <CategoryContext.Provider
      value={{ state, handleChangeStatus, handleRemove, handleSubmitCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
