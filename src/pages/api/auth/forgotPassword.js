import axios from "axios";
import URI_MAP from "../URI/URI_MAP";

export const forgotPassword = async (props) => {
 
  try {
    const response = await axios.post(
      URI_MAP.cmg.forgot_password,{
        email: props.email
      }
    );
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
    return error.response.data 
  }
};
