import { IMenuItem } from "@/types";
import { IconBar, IconOrder, IconSetting, IconUser } from "../icons";
import ActiveLink from "../common/ActiveLink";
import { ModeToggle } from "../common/ModeToggle";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import UserManager from "../common/UserManager";

const menuItems: IMenuItem[] = [
  {
    url: "/admin",
    title: "Dashboard",
    icon: <IconBar />,
  },
  {
    url: "/admin/categories",
    title: "Quản lý danh mục",
    icon: <IconBar />,
  },
  {
    url: "/admin/products",
    title: "Quản lý sản phẩm",
    icon: <IconBar />,
  },
  {
    url: "/admin/users",
    title: "Quản lý thành viên",
    icon: <IconUser />,
  },
  {
    url: "/admin/orders",
    title: "Quản lý đơn hàng",
    icon: <IconOrder />,
  },
  {
    url: "/admin/settings",
    title: "Quản lý cài đặt",
    icon: <IconSetting />,
  },
];
const SideBar = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <div>
      <div className="p-5 border-r border-r-gray-200 dark:bg-grayDarkest dark:border-r-gray-600 bg-white flex flex-col h-full fixed left-0 top-0 bottom-0 w-[300px]">
        <a href="" className="font-bold text-3xl inline-block mb-5">
          <span className="text-primary font-bold">T</span>
          he Ciu Store
        </a>
        <ul>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              url={item.url}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-end gap-5">
          <ModeToggle />
          {user && <UserManager isAdmin />}
        </div>
      </div>
    </div>
  );
};

function MenuItem({ url = "", title = "", icon }: IMenuItem) {
  return (
    <li>
      <ActiveLink url={url} exact={url === "/admin"}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default SideBar;
