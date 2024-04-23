import axios from "axios";
import { getToken, getUserId } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const editProfile = async ({formData}) => {
  const token = getToken();
  const id = getUserId();
  const params = {
    id: id,
  };

  try {
    const response = await axios.post(`${URI_MAP.cmg.edit_profile}?${new URLSearchParams(params).toString()}`, 
      formData
    , {
      headers: {
        "x-access-token": `${token}`,
      },
    });
    return response.data.success
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
