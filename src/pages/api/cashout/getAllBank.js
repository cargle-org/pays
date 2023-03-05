import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getBanks = async () => {
  const token = getToken();

  try {
    const response = await axios.get(URI_MAP.cmg.get_all_banks, {
      headers: {
        "x-access-token": `${token}`,
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.banks;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};