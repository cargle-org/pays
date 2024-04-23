import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getAirtimeBillers = async () => {
  const token = getToken();

  try {
    const response = await axios.get(URI_MAP.cmg.get_airtime_billers);
    return response.data.data.billers;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};