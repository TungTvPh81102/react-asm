import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { CartContext, CartContextType } from "@/contexts/CartContext";
import { OrderContext, OrderContextType } from "@/contexts/OrderContext";
import { orderSchema } from "@/rules/orderSchema";
import { IOrder } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

const ViewCart = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const { state, handleDelete } = useContext(CartContext) as CartContextType;
  const { handleOrder } = useContext(OrderContext) as OrderContextType;
  const [total, setTotal] = useState(0);
  // const [showQr, setShowQr] = useState(false);
  const userId = user?._id || "";
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IOrder>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      user_id: userId,
    },
  });

  useEffect(() => {
    let totalAmount = 0;
    for (const cart of state.carts) {
      for (const product of cart.products) {
        const price = product.product_id?.price || 0;
        const quantity = product.quantity || 0;
        totalAmount += price * quantity;
      }
    }
    setTotal(totalAmount);
  }, [state.carts]);

  // const handleShowQr = () => {
  //   setShowQr(!showQr);
  // };

  const onSubmit = (data: IOrder) => {
    handleOrder({ ...data, total, user_id: userId });
  };

  return (
    <div className="mt-40 mb-20">
      <div className="font-sans max-w-6xl max-lg:max-w-2xl  mx-auto bg-white p-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-100 p-6 rounded-md">
              <h2 className="text-2xl font-extrabold text-gray-800">
                Your Cart
              </h2>
              <div className="space-y-4 mt-8">
                {state.carts.map((cartItem) => (
                  <div key={cartItem._id}>
                    {cartItem.products.map((product) => (
                      <>
                        <div
                          key={product._id}
                          className="flex items-center gap-4"
                        >
                          <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                            <img
                              src={product?.product_id.thumbnail}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="w-full">
                            <h3 className="text-base font-semibold text-gray-800">
                              {product?.product_id?.name}
                            </h3>
                            <h6 className="text-sm text-gray-800 font-bold cursor-pointer mt-0.5">
                              {formatter.format(product?.product_id?.price)}
                            </h6>
                            <div className="flex gap-4 mt-4">
                              <div>
                                <button
                                  type="button"
                                  className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-2.5 fill-current"
                                    viewBox="0 0 124 124"
                                  >
                                    <path
                                      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                      data-original="#000000"
                                    />
                                  </svg>
                                  <span className="mx-2.5">
                                    {product.quantity}
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-2.5 fill-current"
                                    viewBox="0 0 42 42"
                                  >
                                    <path
                                      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                      data-original="#000000"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div className="ml-auto">
                                <button
                                  onClick={() =>
                                    handleDelete(
                                      product.product_id?._id,
                                      userId
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 fill-red-500 inline cursor-pointer"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                      data-original="#000000"
                                    />
                                    <path
                                      d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                      data-original="#000000"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="border-gray-300 mt-4 mb-4" />
                      </>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {state.carts.map((cartItem) => (
              <div key={cartItem._id}>
                {cartItem.products.map((product, index) => (
                  <div key={index}>
                    <Input
                      {...register(`products.${index}.product_id` as const, {
                        value: product.product_id?._id,
                      })}
                      type="hidden"
                    />
                    <Input
                      {...register(`products.${index}.quantity` as const, {
                        valueAsNumber: true,
                      })}
                      type="hidden"
                      value={product.quantity}
                    />
                  </div>
                ))}
              </div>
            ))}
            <h2 className="text-2xl font-extrabold text-gray-800">
              Thông tin vận chuyển
            </h2>
            {/* <input type="text" {...register("user_id")} value={userId} /> */}

            <div className="grid gap-4 mt-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label className="block text-base font-semibold text-gray-800 mb-2">
                    Tên khách hàng
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    defaultValue={user?.name ?? ""}
                    className="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-4">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue={user?.email}
                    className="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-4">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    defaultValue={user?.phone}
                    className="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-4">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-4">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  Ghi chú
                </label>
                <textarea
                  placeholder="Ghi chú"
                  className="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none"
                  {...register("note")}
                />
                {errors.note && (
                  <p className="text-red-500 text-xs mt-4">
                    {errors.note.message}
                  </p>
                )}
              </div>
            </div>
            <ul className="text-gray-800 mt-8 space-y-4">
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total <span className="ml-auto">{formatter.format(total)}</span>
                <input
                  type="hidden"
                  {...register("total", { valueAsNumber: true })}
                  value={total}
                />
              </li>
              {/* {console.log(errors)} */}
            </ul>
            {/* <div
              onClick={handleShowQr}
              className="mt-8 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            >
              Thanh toán
            </div> */}
            {/* {showQr && ( */}
            <div className="mt-4">
              <p>Quét mã QR để thanh toán</p>
              <img
                width={100}
                src="https://th.bing.com/th/id/R.fbd3782b74b283e3a06c44fc7600f0a8?rik=6S9LOi8CSACj%2fQ&pid=ImgRaw&r=0"
                alt=""
              />
              <button
                type="submit"
                className="mt-8 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md"
              >
                Đặt hàng
              </button>
            </div>
            {/* )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
