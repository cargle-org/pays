import axios from "axios";
import { getUserId } from "../auth/auth";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getProfile = async () => {
  const token = getToken();
  const id = getUserId();
  const params = {
    userId: id,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_profile}?${new URLSearchParams(params).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response", response);
    if(response.data.success) {
      return response.data.data.user;
    }
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
