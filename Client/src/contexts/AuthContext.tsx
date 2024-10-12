import api from "@/api";
import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
  user: IUser | null;
  login: (token: string, user: IUser) => void;
  signUp: (user: IUser) => void;
  logout: () => void;
  isAdmin?: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  const signUp = async (user: IUser) => {
    try {
      const { data } = await api.post("/auth/sign-up", user);
      toast.success(data.message);
      nav("/sign-in");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const login = async (token: string, user: IUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Đăng xuất thành công");
    nav("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, isAdmin: user?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
};
