import axios from "axios";
import { SERVER_URL } from "../constants/index";
export const getPremiums = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/premium`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Lỗi khi lấy danh sách premium");
    }
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách premium", error.message);
  }
};
