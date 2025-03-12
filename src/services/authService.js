import axios from "axios";

import { SERVER_URL } from "../constants";
import { toast } from "react-toastify";
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${SERVER_URL}/auth`, {
      username,
      password,
    });
    if (response.status == 200) {
      return {
        token: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
        user: {
          accountId: response.data.data.accountId,
          userName: response.data.data.userName,
          role: response.data.data.roleEnum,
        },
      };
    } else {
      toast.error("Đăng nhập thất bại");
    }
  } catch (error) {
    throw error.response?.data?.message || "Đăng nhập thất bại!";
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/user`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error.response?.data || error.message);
    throw error;
  }
};
