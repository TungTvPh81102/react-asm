/* eslint-disable react-hooks/rules-of-hooks */
import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { CartContext, CartContextType } from "@/contexts/CartContext";
import { useForm } from "react-hook-form";
import { ICart } from "@/types";
import { cartSchema } from "@/rules/cartSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductDetail = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { getDetail, state } = useContext(ProductContext) as ProductContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  if (slug) {
    useEffect(() => {
      getDetail(slug);
    }, [slug, getDetail]);
  }

  const { addToCart } = useContext(CartContext) as CartContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cartSchema),
  });

  const onSubmit = (data: ICart) => {
    addToCart({
      ...data,
      product_id: state.selectedProduct?._id,
      user_id: user?._id,
    });
  };
  return (
    <div>
      <div className="font-sans tracking-wide p-4 mx-auto mt-40 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 text-center">
            <div className="lg:h-[450px] p-4 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
              <img
                src={state.selectedProduct?.thumbnail}
                alt="Product"
                className="lg:w-11/12 w-full h-full rounded object-contain object-top"
              />
            </div>
            <div className="flex flex-wrap gap-4 mx-auto mt-4">
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass1.webp"
                  alt="Product2"
                  className="w-20 h-16 object-contain"
                />
              </div>
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass2.webp"
                  alt="Product3"
                  className="w-20 h-16 object-contain"
                />
              </div>
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass3.webp"
                  alt="Product4"
                  className="w-20 h-16 object-contain"
                />
              </div>
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass5.webp"
                  alt="Product5"
                  className="w-20 h-16 object-contain"
                />
              </div>
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass6.webp"
                  alt="Product6"
                  className="w-20 h-16 object-contain"
                />
              </div>
              <div className="cursor-pointer p-1 relative before:absolute before:inset-0 before:bg-black before:opacity-20 before:rounded">
                <img
                  src="https://readymadeui.com/images/sunglass7.webp"
                  alt="Product7"
                  className="w-20 h-16 object-contain"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">
                  {state.selectedProduct?.name}
                </h2>
                <div className="flex space-x-1 mt-4">
                  <svg
                    className="w-5 fill-orange-500"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-orange-500"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-orange-500"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-orange-500"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-5 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                </div>
              </div>
              <div className="ml-auto flex flex-wrap gap-4">
                <button
                  type="button"
                  className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    fill="currentColor"
                    className="mr-1"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    />
                  </svg>
                  100
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12px"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                      data-original="#000000"
                    />
                    <path
                      d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                      data-original="#000000"
                    />
                    <path
                      d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                      data-original="#000000"
                    />
                    <path
                      d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                      data-original="#000000"
                    />
                    <path
                      d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                      data-original="#000000"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <hr className="my-6" />
            <div>
              {state.selectedProduct?.discount !== 0 ? (
                <>
                  <h3 className="text-xl font-bold text-gray-800">Price</h3>
                  <div className="flex justify-between">
                    <p className="text-gray-400 text-4xl font-bold mt-4 line-through">
                      {formatter.format(state.selectedProduct?.price || 0)}
                    </p>
                    <p className="text-gray-800 text-4xl font-bold mt-4">
                      {formatter.format(state.selectedProduct?.discount || 0)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-800">Price</h3>
                  <p className="text-gray-800 text-4xl font-bold mt-4">
                    {formatter.format(state.selectedProduct?.price || 0)}
                  </p>
                </>
              )}
            </div>
            <hr className="my-6" />
            {/* <div>
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-400 border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-orange-500 border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
                <button
                  type="button"
                  className="w-10 h-10 bg-red-400 border-2 border-white hover:border-gray-800 rounded shrink-0"
                />
              </div>
            </div> */}
            <hr className="my-6" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Quantity
                </h3>
                <FormItem>
                  <Input
                    type="text"
                    defaultValue="1"
                    placeholder="Quantity"
                    {...register("quantity", {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                </FormItem>
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-4">
                    {errors.quantity.message?.toString()}
                  </p>
                )}
              </div>
              <hr className="my-6" />
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <button
                    type="submit"
                    className="min-w-[200px] px-4 py-2.5 border cursor-pointer hover:bg-orange-500 hover:text-white border-orange-500 bg-transparent text-gray-800 text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled
                    className="min-w-[200px] px-4 py-2.5 border cursor-pointer bg-orange-500  border-orange-500 text-white  text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="mt-6 max-w-2xl">
          <h3 className="text-xl font-bold text-gray-800">Product Features</h3>
          <ul className="grid sm:grid-cols-2 gap-3 mt-4">
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              UV Protection
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Stylish Design
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Lightweight Frame
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Scratch-Resistant Lenses
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Polarized Lenses
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                className="mr-4 bg-orange-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Comfortable Fit
            </li>
          </ul>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800">
              Product Description
            </h3>
            <p className="text-sm text-gray-600 mt-4">
              {state.selectedProduct?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
{
  /* {user ? (
                  <button
                    onClick={() =>
                      addToCart(state.selectedProduct?._id, 1, user.id)
                    }
                    className="min-w-[200px] px-4 py-2.5 border cursor-pointer hover:bg-orange-500 hover:text-white  border-orange-500 bg-transparent  text-gray-800 text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    disabled
                    onClick={() =>
                      addToCart(
                        state.selectedProduct?._id,
                        1,
                        state.selectedProduct
                      )
                    }
                    className="min-w-[200px] px-4 py-2.5 border cursor-pointer   border-orange-500 bg-transparent  text-gray-800 text-sm font-semibold rounded"
                  >
                    Add to cart
                  </button>
                )} */
}
