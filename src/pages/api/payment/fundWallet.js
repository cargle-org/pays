import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const fundWallet = async ({ depositAmount }) => {
  const token = getToken();

  try {
    const response = await axios.post(URI_MAP.cmg.fund_wallet, {
      amount: depositAmount,
    }, {
      headers: {
        "x-access-token": `${token}`,
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.response;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
