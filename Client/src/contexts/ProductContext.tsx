import api from "@/api";
import productReducer from "@/reducer/productReducer";
import { IProduct } from "@/types";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type ProductContextType = {
  state: {
    dataNotFound: boolean;
    products: IProduct[];
    selectedProduct?: IProduct;
  };
  getDetail: (slug: string | undefined) => Promise<IProduct>;
  handleSubmitProduct: (category: IProduct) => void;
  handleChangeStatus: (id: string | undefined, status: boolean) => void;
  handleRemove: (id: string | undefined) => void;
  fetchProductsByCategory: (categorySlug: string | null) => void;
  searchProducts: (searchTerm: string) => void;
  sortProducts: (sortOption: string) => void;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    dataNotFound: false,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    })();
  }, [refresh]);

  const handleSubmitProduct = async (product: IProduct) => {
    try {
      if (product.slug) {
        const { slug, ...dataUpdate } = product;
        const { data } = await api.patch(`/products/${slug}`, dataUpdate);
        dispatch({
          type: "PATCH_PRODUCT",
          payload: data.data,
        });
        toast.success(data.message);
      } else {
        const { data } = await api.post("/products", product);
        dispatch({
          type: "POST_PRODUCT",
          payload: data.data,
        });
        toast.success(data.message);
      }
      setRefresh(!refresh);
      nav("/admin/products");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const searchProducts = async (searchTerm: string) => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      console.log(encodedSearchTerm);
      const endPoint = searchTerm
        ? `/products?search=${encodedSearchTerm}`
        : "/products";

      const { data } = await api.get(endPoint);

      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    } catch (error) {
      toast.warning("Không có sản phẩm cần tìm");
      dispatch({
        type: "SET_DATA_NOT_FOUND",
        payload: true,
      });
    }
  };

  const sortProducts = async (sortOption: string) => {
    try {
      const endpoint = `/products${sortOption ? `?sort=${sortOption}` : ""}`;

      const { data } = await api.get(endpoint);
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    } catch (error) {
      toast.error("Failed to sort products.");
    }
  };

  const fetchProductsByCategory = async (categorySlug: string | null) => {
    try {
      const { data } = await api.get(
        `/products?categorySlug=${categorySlug || ""}`
      );

      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    } catch (error) {
      toast.warning("Danh mục chưa có sản phẩm");
      dispatch({
        type: "SET_DATA_NOT_FOUND",
        payload: true,
      });
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
          const { data } = await api.put(`/products/${id}/status`, {
            status: !status,
          });
          const updatedCategory = data.data;
          dispatch({
            type: "CHANGE_STATUS_PRODUCT",
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
          const { data } = await api.delete(`/products/${id}`);
          console.log(data);
          dispatch({
            type: "DELETE_PRODUCT",
            payload: id,
          });
          toast.success(data.message);
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui loại thực hiện");
    }
  };

  const getDetail = async (slug: string | undefined) => {
    const { data } = await api.get(`/products/${slug}`);
    dispatch({
      type: "SET_SELECTED_PRODUCT",
      payload: data.data,
    });

    return data;
  };
  return (
    <ProductContext.Provider
      value={{
        state,
        handleChangeStatus,
        handleRemove,
        handleSubmitProduct,
        getDetail,
        fetchProductsByCategory,
        searchProducts,
        sortProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
