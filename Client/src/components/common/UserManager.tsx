import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IconOrder, IconUser } from "../icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import IconSignOut from "../icons/IconSignOut";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const UserManager = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  const handleSaveChanges = () => {
    // Implement your save logic here
    console.log("Save changes");
  };
  return (
    <div>
      {" "}
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                <img src="https://github.com/shadcn.png" alt="" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"w-48 mb-2 bg-white "}>
            <DropdownMenuLabel>
              {" "}
              <Sheet>
                <SheetTrigger asChild>
                  <DropdownMenuLabel className="cursor-pointer">
                    <div className="flex gap-2">
                      <IconUser />
                      My Account
                    </div>
                  </DropdownMenuLabel>
                </SheetTrigger>
                <SheetContent className="bg-white w-full">
                  <SheetHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="border border-black">
                          {user?.name}
                        </AvatarFallback>
                      </Avatar>
                      <SheetTitle>Thông tin người dùng</SheetTitle>
                    </div>
                  </SheetHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={user?.name}
                        className="col-span-3 mt-3"
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="username" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="username"
                        value={user?.email}
                        className="col-span-3 mt-3"
                      />
                    </div>
                  </div>
                  <div className="grid mb-4">
                    <div className="">
                      <Label htmlFor="name" className="text-right">
                        Avatar
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3 mt-3"
                        placeholder="https://github.com/shadcn.png"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      type="submit"
                      className="text-white font-bold"
                      onClick={handleSaveChanges}
                    >
                      Cập nhật
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <DropdownMenuLabel className="cursor-pointer">
                {user?.role === "admin" && isAdmin == false && (
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <Link className="mb-4" to="/admin">
                      Truy cập quản trị
                    </Link>
                  </div>
                )}
                <Link to="/my-orders" className="flex gap-2 mb-4">
                  <IconOrder />
                  My Order
                </Link>
                <button
                  onClick={logout}
                  className="flex text-black items-center justify-center gap-2"
                >
                  <IconSignOut />
                  <span>Sign out</span>
                </button>
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </div>
  );
};

export default UserManager;
