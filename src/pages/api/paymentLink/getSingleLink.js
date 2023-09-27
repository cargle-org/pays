import axios from "axios";
import { getToken } from "../auth/auth";
import { BASE_URL } from "../URI/URI_MAP";

export const getSingleLink = async (id) => {
    const token = getToken();
    console.log(id, 'hi');
  try {
    const response = await axios.get(`${BASE_URL}utils/links/${id}`, {
        headers: {
          "x-access-token": `${token}`,
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};