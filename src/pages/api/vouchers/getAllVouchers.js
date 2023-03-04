import axios from "axios";
import { getToken, getUserId } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getAllVouchers = async () => {
  const token = getToken();
  const id = getUserId();
  const params = {
    userId: id,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_all_vouchers}?${new URLSearchParams(params).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response", response.data.data.vouchers);
    return response.data.data.vouchers;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
