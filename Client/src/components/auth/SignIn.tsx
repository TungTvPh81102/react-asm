/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { signInSchema } from "@/rules/authSchema";
import { IUser } from "@/types";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import api from "@/api";

export default function SignUp() {
  const { login } = useContext(AuthContext) as AuthContextType;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUser>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (user: IUser) => {
    try {
      const data = await api.post("/auth/sign-in", user);
      if (data.status === 200) {
        login(data.data.accessToken, data.data.user);
        toast.success(data.data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-100 dark:bg-grayDarker">
        <div className="bg-white p-10 rounded-2xl dark:bg-grayDarkest">
          <div className="text-center">
            <strong className="font-semibold text-3xl">
              Đăng nhập tài khoản
            </strong>
            <p className="text-neutral-500 mt-3">
              Chào mừng! Vui lòng điền thông tin chi tiết để bắt đầu <br />
              đăng nhập
            </p>
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-lg p-1 mt-5 flex items-center justify-center border border-neutral-300">
                <i className="fa-brands fa-google"></i>
                <span className="font-semibold ml-3">Google</span>
              </div>
              <div className="rounded-lg p-1 mt-5 flex items-center justify-center border border-neutral-300">
                <i className="fa-brands fa-facebook"></i>
                <span className="font-semibold ml-3">Facebook</span>
              </div>
            </div>
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-neutral-300"></div>
              <span className="text-neutral-500 mx-3">or</span>
              <div className="flex-grow border-t border-neutral-300"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem className="mb-4">
              <label htmlFor="name">Email</label>
              <Input
                type="email"
                placeholder="Nhập email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 mt-2">
                  {errors.email.message?.toString()}
                </p>
              )}
            </FormItem>
            <FormItem className="mb-4">
              <label htmlFor="name">Mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 mt-2">
                  {errors.password.message?.toString()}
                </p>
              )}
            </FormItem>
            <Button
              className="w-full mt-2 mb-4 text-white font-bold dark:bg-primary dark:text-white "
              type="submit"
            >
              Đăng nhập
            </Button>
          </form>
          <span>
            Bạn chưa có tài khoản?{" "}
            <Link to="/sign-up" className="text-blue-500">
              Đăng ký
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
