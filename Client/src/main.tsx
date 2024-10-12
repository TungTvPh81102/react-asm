import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { CategoryProvider } from "./contexts/CategoryContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { OrderProvider } from "./contexts/OrderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CategoryProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
