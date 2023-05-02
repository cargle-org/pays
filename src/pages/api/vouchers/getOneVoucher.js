import axios from "axios";
import { getToken, getUserId } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getOneVoucher = async ({id, status}) => {
  const token = getToken();
  const params = {
    voucherId: id,
    status: status,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_one_voucher}?${new URLSearchParams(params).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.voucher;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
