/* eslint-disable react-hooks/rules-of-hooks */
import Heading from "@/components/typography/Heading";
import Title from "@/components/typography/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/rules/categorySchema";
import { FormItem } from "@/components/ui/form";
import { ICategory } from "@/types";
import { useContext, useEffect, useState } from "react";
import {
  CategoryContext,
  CategoryContextType,
} from "@/contexts/CategoryContext";
import api from "@/api";

enum CategoryStatus {
  Active = "true",
  Inactive = "false",
}

const CategoryForm = () => {
  const { handleSubmitCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const { id } = useParams();
  const [data, setData] = useState<ICategory>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ICategory>({
    resolver: zodResolver(categorySchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/categories/${id}`);
        const category = data.data;
        const status = category.status
          ? CategoryStatus.Active
          : CategoryStatus.Inactive;
        setData(category);
        reset({
          ...category,
          status,
        });
      })();
    }, [id, reset]);
  }

  const onSubmit = (data: ICategory) => {
    if (id) {
      handleSubmitCategory({ ...data, _id: id });
    } else {
      handleSubmitCategory(data);
    }
  };

  return (
    <div>
      <Heading>Quản lý danh mục</Heading>
      <Title className="mt-4 mb-4">
        {id ? `Cập nhật danh mục: ${data?.name}` : "Thêm mới danh mục"}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <label htmlFor="name">Tên danh mục</label>
            <Input
              type="text"
              placeholder="Nhập tên danh mục"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message?.toString()}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="name">Trạng thái</label>
            <FormItem>
              <select className="form-control" {...register("status")}>
                <option value={CategoryStatus.Active}>Active</option>
                <option value={CategoryStatus.Inactive}>Inactive</option>
              </select>
            </FormItem>
            {errors.status && (
              <p className="text-red-500">
                {errors.status.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>

        <Button type="submit" className="mt-4 text-white font-bold">
          {id ? "Cập nhật" : "Tạo mới"}
        </Button>
        <Link
          to="/admin/categories"
          className="bg-gray-500 text-white h-11 rounded-md p-[9px] ml-2"
        >
          Quay lại trang danh sách
        </Link>
      </form>
    </div>
  );
};

export default CategoryForm;
