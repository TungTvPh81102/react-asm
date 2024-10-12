/* eslint-disable react-hooks/rules-of-hooks */
import Heading from "@/components/typography/Heading";
import Title from "@/components/typography/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem } from "@/components/ui/form";
import { IProduct } from "@/types";
import { useContext, useEffect, useState } from "react";

import api from "@/api";
import { Textarea } from "@/components/ui/textarea";
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import {
  CategoryContext,
  CategoryContextType,
} from "@/contexts/CategoryContext";
import { Status } from "@/types/enum";
import { productSchema } from "@/rules/productSchema";

const ProductForm = () => {
  const { handleSubmitProduct } = useContext(
    ProductContext
  ) as ProductContextType;
  const { state } = useContext(CategoryContext) as CategoryContextType;
  const { slug } = useParams();
  const [data, setData] = useState<IProduct>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(productSchema),
  });

  if (slug) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/products/${slug}`);
        const product = data.data;
        const status = product.status ? Status.ACTIVE : Status.INACTIVE;
        setData(product);
        reset({
          ...product,
          status,
          category_id: product.category_id?._id || "",
        });
      })();
    }, [slug, reset]);
  }

  const onSubmit = (data: IProduct) => {
    if (slug) {
      handleSubmitProduct({ ...data, slug });
    } else {
      handleSubmitProduct(data);
    }
  };

  return (
    <div>
      <Heading>Quản lý sản phẩm</Heading>
      <Title className="mt-4 mb-4">
        {slug ? `Cập nhật sản phẩm: ${data?.name}` : "Thêm mới sản phẩm"}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="name">Tên sản phẩm</label>
            <Input
              type="text"
              placeholder="Nhập sản phẩm"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message?.toString()}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="category_id">Danh mục sản phẩm</label>
            <FormItem>
              <select
                id="category_id"
                className="form-control"
                defaultValue={data?.category_id?._id || ""}
                {...register("category_id", { required: true })}
              >
                <option value="">--- Chọn danh mục ---</option>
                {state.categories.map((item) => (
                  <option key={item._id} value={item._id?.toString()}>
                    {item.name}
                  </option>
                ))}
              </select>
            </FormItem>
            {errors.category_id && (
              <p className="text-red-500">
                {errors.category_id.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="name">Giá gốc</label>
            <Input
              type="number"
              placeholder="Nhập giá gốc"
              {...register("price", { valueAsNumber: true, required: true })}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message?.toString()}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="name">Giá khuyến mại (nếu có)</label>
            <Input
              type="number"
              min={0}
              placeholder="Nhập giá km"
              {...register("discount", { valueAsNumber: true })}
            />
            {errors.discount && (
              <p className="text-red-500">
                {errors.discount.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="name">Hình ảnh</label>
            <Input
              type="text"
              placeholder="Nhập url hình ảnh"
              {...register("thumbnail", { required: true })}
            />
            {errors.thumbnail && (
              <p className="text-red-500">
                {errors.thumbnail.message?.toString()}
              </p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="name">Số lượng</label>
            <Input
              type="number"
              min={0}
              placeholder="Nhập số lượng"
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity && (
              <p className="text-red-500">
                {errors.quantity.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>

        <div>
          <FormItem>
            <label htmlFor="name">Mô tả</label>
            <Textarea placeholder="Nhập mô tả" {...register("description")} />
            {errors.description && (
              <p className="text-red-500">
                {errors.description.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>

        <FormItem className="mt-4">
          <label htmlFor="name">Trạng thái</label>
          <FormItem>
            <select className="form-control" {...register("status")}>
              <option value={Status.ACTIVE}>Active</option>
              <option value={Status.INACTIVE}>Inactive</option>
            </select>
          </FormItem>
          {errors.status && (
            <p className="text-red-500">{errors.status.message?.toString()}</p>
          )}
        </FormItem>

        <Button type="submit" className="mt-4 text-white font-bold">
          {slug ? "Cập nhật" : "Tạo mới"}
        </Button>
        <Link
          to="/admin/products"
          className="bg-gray-500 text-white h-11 rounded-md p-[9px] ml-2"
        >
          Quay lại trang danh sách
        </Link>
      </form>
    </div>
  );
};

export default ProductForm;
