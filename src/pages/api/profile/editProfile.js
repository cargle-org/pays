import axios from "axios";
import { getToken, getUserId } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const editProfile = async (props) => {
  const token = getToken();
  const id = getUserId();
  const params = {
    id: id,
  };

  try {
    const response = await axios.post(`${URI_MAP.cmg.edit_profile}?${new URLSearchParams(params).toString()}`, {
      name: props.fullName,
      phone: props.phoneNum,
      email: props.email,
    }, {
      headers: {
        "x-access-token": `${token}`,
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    });
    console.log('response :>> ', response.data.success);
    return response.data.success
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
