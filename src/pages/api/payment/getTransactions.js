import axios from "axios";
// import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";
import { getToken, getUserId } from "../auth/auth";

export const getTransactions = async (props) => {
  const token = getToken();
  const userId = getUserId()
  const params = {
    userId: userId,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_all_transactions}?${new URLSearchParams(params).toString()}`,
      {
        headers: {
          "x-access-token": `${token}`,
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
