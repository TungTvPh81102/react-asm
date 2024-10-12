import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useAuth } from "@/contexts/AuthContext";
import Forbidden from "../errors/Forbidden";

const LayoutAdmin = () => {
  const { user } = useAuth();

  if (!user || user?.role !== "admin") {
    return <Forbidden />;
  }

  return (
    <div>
      <div className="h-screen dark:bg-grayDarker grid grid-cols-[300px,minmax(0,1fr)]">
        <SideBar />
        <main className="ml-5 mr-6 mt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
