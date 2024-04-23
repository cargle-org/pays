import axios from "axios";
import URI_MAP from "../URI/URI_MAP"
import { getToken } from "../auth/auth";

export const payToLink = async (props) => {
    const token = getToken();
  try {
    const response = await axios.post(URI_MAP.cmg.pay_to_link, {...props}, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "application/json",
        },
      });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};