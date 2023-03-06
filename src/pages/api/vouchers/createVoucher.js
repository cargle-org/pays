import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const createVoucher = async ({ formData }) => {
  const token = getToken();

  try {
    const response = await axios.post(URI_MAP.cmg.create_voucher, formData, {
      headers: {
        "x-access-token": `${token}`,
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data
  }
};
