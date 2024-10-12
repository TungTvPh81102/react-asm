import "../app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ListCategory from "./pages/admin/category/ListCategory";
import CategoryForm from "./pages/admin/category/CategoryForm";
import ListProduct from "./pages/admin/product/ListProduct";
import ProductForm from "./pages/admin/product/ProductForm";
import ListUser from "./pages/admin/user/ListUser";
import UserForm from "./pages/admin/user/UserForm";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import PrivateRouter from "./components/auth/PrivateRouter";
import PageNotFound from "./components/errors/PageNotFound";
import PublicRoute from "./components/auth/PublicRouter";
import ListOrder from "./pages/admin/order/ListOrder";
import LayoutClient from "./components/layouts/LayoutClient";
import Home from "./pages/Home";
import ProductDetail from "./components/ProductDetail";
import ViewCart from "./components/ViewCart";
import Shop from "./pages/Shop";
import ViewOrder from "./pages/admin/order/ViewOrder";
import OrderSuccess from "./components/OrderSuccess";
import MyOrder from "./components/MyOrder";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer />
        <Toaster />
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route index element={<Home />}></Route>
            <Route
              path="/product-detail/:slug"
              element={<ProductDetail />}
            ></Route>
            <Route path="shop" element={<Shop />}></Route>
            <Route path="view-cart" element={<ViewCart />}></Route>
            <Route path="my-orders" element={<MyOrder />}></Route>
            <Route path="orders/success" element={<OrderSuccess />}></Route>
          </Route>
          <Route path="/admin/*" element={<PrivateRouter />}>
            <Route element={<LayoutAdmin />}>
              <Route index element={<Dashboard />}></Route>
              <Route path="categories" element={<ListCategory />}></Route>
              <Route
                path="categories/create"
                element={<CategoryForm />}
              ></Route>
              <Route
                path="categories/edit/:id"
                element={<CategoryForm />}
              ></Route>
              <Route path="products" element={<ListProduct />}></Route>
              <Route path="products/create" element={<ProductForm />}></Route>
              <Route
                path="products/edit/:slug"
                element={<ProductForm />}
              ></Route>
              <Route path="users" element={<ListUser />}></Route>
              <Route path="users/create" element={<UserForm />}></Route>
              <Route path="users/edit/:id" element={<UserForm />}></Route>
              <Route path="orders" element={<ListOrder />}></Route>
              <Route path="orders/:id" element={<ViewOrder />}></Route>
            </Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
