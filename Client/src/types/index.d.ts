import { Delivery } from "./enum";

export interface IMenuItem {
  url: string;
  title: string;
  icon?: React.ReactNode;
}

export interface IActiveLinks {
  url: string;
  children: React.ReactNode;
  exact?: boolean;
}

export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  status?: boolean;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug?: string;
  price: number;
  discount?: number;
  quantity?: number;
  thumbnail?: string;
  category_id: ICategory;
  description?: string;
  status?: boolean;
}

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
  phone?: string;
  confirmPassword?: string;
  status?: boolean;
  role?: "member" | "admin";
}

export interface ICartItem {
  _id?: string;
  product_id?: string;
  quantity?: number;
}

export interface ICart {
  _id?: string;
  user_id?: string;
  products: ICartItem[];
  total?: number;
  // quatity?: number;
}

export interface IOrder {
  _id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  products: ICartItem[];
  address?: string;
  phone?: string;
  status?: boolean;
  total?: number;
  delivery?: Delivery;
  quantity?: number;
  note?: string;
}
