import axios from "axios";
// import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const verifyAccount = async (props) => {
  // const token = getToken();
  const params = {
    id: props.id,
    emailToken: props.emailToken,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.verify_account}?${new URLSearchParams(params).toString()}`,
      // null,
      // {
      //   headers: {
      //     "x-access-token": `${token}`,
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    // console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
