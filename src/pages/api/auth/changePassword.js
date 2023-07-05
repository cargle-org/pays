import axios from "axios";
import URI_MAP from "../URI/URI_MAP";
import { getUserId } from "./auth";

export const changePassword = async (props) => {
  const userId = getUserId()
  const params = {
    userId: userId,
  };

  try {
    const response = await axios.post(
      `${URI_MAP.cmg.change_password}?${new URLSearchParams(
        params
      ).toString()}`,
      { oldPassword: props.oldPassword, newPassword: props.newPassword, confirmPassword: props.confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.success;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
