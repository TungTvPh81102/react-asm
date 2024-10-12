import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "@/components/typography/Heading";
import Title from "@/components/typography/Title";
import { FormItem } from "@/components/ui/form";
import api from "@/api";
import { OrderContext, OrderContextType } from "@/contexts/OrderContext";
import { orderSchema } from "@/rules/orderSchema";
import { IOrder } from "@/types";
import { Delivery, Status } from "@/types/enum";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ViewOrder = () => {
  const { handleOrder } = useContext(OrderContext) as OrderContextType;
  const { id } = useParams();
  const [data, setData] = useState<IOrder>();
  const [isReadOnly, setIsReadOnly] = useState(false); // New state for readonly

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IOrder>({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await api.get(`/order/${id}`);
        const order = data.data;
        const user_id = order.user_id._id;
        const status = order.status ? Status.ACTIVE : Status.INACTIVE;
        const products = order.products.map((item) => item.product_id._id);
        setData(order);
        reset({
          ...order,
          products,
          user_id,
          status,
        });

        if (order.delivery === Delivery.SUCCESS_DELIVERY) {
          setIsReadOnly(true);
        }
      })();
    }
  }, [id, reset]);

  const onSubmit = (formData: IOrder) => {
    if (id) {
      handleOrder({ ...formData, _id: id });
    }
  };

  return (
    <div className="mb-10">
      <Heading>Quản lý đơn hàng</Heading>
      <Title className="mt-4 mb-4">
        {id && `Cập nhật đơn hàng: ${data?._id}`}
      </Title>
      <Title className="mt-4 mb-4">Thông tin vận chuyển</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <Input type="hidden" {...register("user_id")} />
          <FormItem>
            <label htmlFor="name">Tên khách hàng</label>
            <Input
              type="text"
              placeholder="Nhập tên danh mục"
              {...register("name", { required: true })}
              readOnly={isReadOnly}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message?.toString()}</p>
            )}
          </FormItem>
          <FormItem>
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              placeholder="Nhập email"
              {...register("email", { required: true })}
              readOnly={isReadOnly}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message?.toString()}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              type="text"
              placeholder="Nhập số điện thoại"
              {...register("phone", { required: true })}
              readOnly={isReadOnly}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message?.toString()}</p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="address">Địa chỉ</label>
            <Input
              type="text"
              placeholder="Nhập địa chỉ"
              {...register("address", { required: true })}
              readOnly={isReadOnly}
            />
            {errors.address && (
              <p className="text-red-500">
                {errors.address.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>

        <FormItem className="mt-4">
          <label htmlFor="note">Ghi chú</label>
          <Textarea
            placeholder="Nhập ghi chú"
            {...register("note", { required: true })}
            readOnly={isReadOnly}
          />
          {errors.note && (
            <p className="text-red-500">{errors.note.message?.toString()}</p>
          )}
        </FormItem>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormItem>
            <label htmlFor="status">Trạng thái thanh toán</label>
            <FormItem>
              <select
                className="form-control"
                {...register("status")}
                readOnly={isReadOnly}
              >
                <option value={Status.ACTIVE}>Đã thanh toán</option>
                <option value={Status.INACTIVE}>Chưa thanh toán</option>
              </select>
            </FormItem>
            {errors.status && (
              <p className="text-red-500">
                {errors.status.message?.toString()}
              </p>
            )}
          </FormItem>

          <FormItem>
            <label htmlFor="delivery">Trạng thái vận chuyển</label>
            <FormItem>
              <select
                className="form-control"
                {...register("delivery")}
                readOnly={isReadOnly}
              >
                <option value={Delivery.PROCESSING}>Đang xử lý</option>
                <option value={Delivery.DELIVERING}>Đang vận chuyển</option>
                <option value={Delivery.SUCCESS_DELIVERY}>
                  Giao hàng thành công
                </option>
                <option value={Delivery.CANCELLED}>Đã hủy</option>
              </select>
            </FormItem>
            {errors.delivery && (
              <p className="text-red-500">
                {errors.delivery.message?.toString()}
              </p>
            )}
          </FormItem>
        </div>

        <Title className="mt-4 mb-4">Thông tin đơn hàng</Title>
        <div className="border border-gray-300 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Giá</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.products.map((item, index) => (
                <TableRow key={item._id}>
                  {console.log(errors)}
                  <Input
                    type="hidden"
                    {...register(`products.${index}.product_id`, {
                      value: item.product_id._id,
                    })}
                    readOnly={isReadOnly}
                  />
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.product_id?.name}</TableCell>
                  <TableCell>
                    <img src={item.product_id.thumbnail} width={100} alt="" />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={item.quantity}
                      {...register(`products.${index}.quantity`, {
                        valueAsNumber: true,
                        required: true,
                      })}
                      readOnly={isReadOnly}
                    />
                    {errors.products?.[index]?.quantity && (
                      <p className="text-red-500">
                        {errors.products[index].quantity?.message?.toString()}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>{item.product_id.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Tổng tiền</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>{data?.total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
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

export default ViewOrder;
