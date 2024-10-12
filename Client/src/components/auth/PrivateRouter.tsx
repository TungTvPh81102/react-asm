import { Outlet } from "react-router-dom";
import Forbidden from "../errors/Forbidden";

const PrivateRouter = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Forbidden />;
};

export default PrivateRouter;
