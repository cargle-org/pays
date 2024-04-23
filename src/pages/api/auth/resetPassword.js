import axios from "axios";
import URI_MAP from "../URI/URI_MAP";

export const resetPassword = async (props) => {
  const params = {
    id: props.id,
    resetToken: props.resetToken,
  };

  try {
    const response = await axios.post(
      `${URI_MAP.cmg.reset_password}?${new URLSearchParams(
        params
      ).toString()}`,
      { newPassword: props.password, confirmPassword: props.passwordTwo },
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
