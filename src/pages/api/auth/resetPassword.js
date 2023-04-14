import axios from "axios";
import URI_MAP from "../URI/URI_MAP";

export const resetPassword = async (props) => {
  const params = {
    resetToken: props.resetToken,
  };

  try {
    const response = await axios.put(
      `${URI_MAP.cmg.reset_password}?${params.toString()}`,
      { newPassword: props.password, confirmPassword: props.passwordTwo },
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    return response.data.success;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
