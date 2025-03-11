import axiosInstance from "../config/axios";
import { SERVER_URL } from "../constants";

export const getListeners = async (sortBy) => {
  try {
    const response = await axiosInstance.get(`${SERVER_URL}/listener`, {
      params: {
        [sortBy.field]: sortBy.value,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Lấy danh sách người nghe thất bại");
    }
  } catch (error) {
    throw error.response?.data?.message || "Lấy danh sách người nghe thất bại!";
  }
};
