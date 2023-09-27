import axios from "axios";
import { getUserId } from "../auth/auth";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const getAllLinks = async ({pageSize, page}) => {
  const token = getToken();
  const id = getUserId();
  const params = {
    pageSize,
    page,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_all_links}?${new URLSearchParams(params).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
