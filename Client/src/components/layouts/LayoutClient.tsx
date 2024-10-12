import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LayoutClient = () => {
  return (
    <div className="h-screen w-screen">
      <Header />
      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutClient;
