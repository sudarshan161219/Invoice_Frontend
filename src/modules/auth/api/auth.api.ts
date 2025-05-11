import api from "@/lib/api";
import type { IRegisterDTO } from "@/types/register";
import type { ILoginDTO } from "@/types/login";

export const registerUser = async (data: IRegisterDTO) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: ILoginDTO) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
