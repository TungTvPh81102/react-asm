/* eslint-disable react-hooks/rules-of-hooks */
import Heading from "@/components/typography/Heading";
import Title from "@/components/typography/Title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem } from "@/components/ui/form";
import { IUser } from "@/types";
import { useContext, useEffect, useState } from "react";
import api from "@/api";
import { Status, UserRole } from "@/types/enum";
import { UserContext, UserContextType } from "@/contexts/UserContext";
import { userSchema } from "@/rules/userSchema";

const UserForm = () => {
  const { handleSubmitUser } = useContext(UserContext) as UserContextType;
  const { id } = useParams();
  const [data, setData] = useState<IUser>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(userSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/users/${id}`);
        const user = data.others;
        const status = user.status ? Status.ACTIVE : Status.INACTIVE;
        const role = user.role === "admin" ? UserRole.ADMIN : UserRole.MEMBER;
        setData(user);
        reset({
          ...user,
          status,
          role,
        });
      })();
    }, [id, reset]);
  }

  const onSubmit = (data: IUser) => {
    if (id) {
      handleSubmitUser({ ...data, _id: id });
    } else {
      handleSubmitUser(data);
    }
  };

  return (
    <div>
      <Heading>Quản lý người dùng</Heading>
      <Title className="mt-4 mb-4">
        {id ? `Cập nhật người dùng: ${data?.name}` : "Thêm mới người dùng"}
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="name">Tên người dùng</label>
            <Input
              type="text"
              placeholder="Nhập tên người dùng"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message?.toString()}</p>
            )}
          </FormItem>
          <FormItem>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="Nhập email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message?.toString()}</p>
            )}
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="password">Mật khẩu</label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message?.toString()}
              </p>
            )}
          </FormItem>
          <FormItem>
            <label htmlFor="avatar">Hình ảnh</label>
            <Input
              type="text"
              placeholder="Nhập url hình ảnh"
              {...register("avatar", { required: true })}
            />
            {errors.avatar && (
              <p className="text-red-500">
                {errors.avatar.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormItem>
            <label htmlFor="name">Trạng thái</label>
            <FormItem>
              <select className="form-control" {...register("status")}>
                <option value={Status.ACTIVE}>Active</option>
                <option value={Status.INACTIVE}>Inactive</option>
              </select>
            </FormItem>
            {errors.status && (
              <p className="text-red-500">
                {errors.status.message?.toString()}
              </p>
            )}
          </FormItem>
          <FormItem>
            <label htmlFor="name">Vai trò</label>
            <FormItem>
              <select className="form-control" {...register("role")}>
                <option value={UserRole.MEMBER}>Member</option>
                <option value={UserRole.ADMIN}>Admin</option>
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
          to="/admin/users"
          className="bg-gray-500 text-white h-11 rounded-md p-[9px] ml-2"
        >
          Quay lại trang danh sách
        </Link>
      </form>
    </div>
  );
};

export default UserForm;
