import axios from "axios";
import URI_MAP from "../URI/URI_MAP"
import { getToken } from "../auth/auth";

export const createLink = async (props) => {
const token = getToken();
console.log(props);
  try {
    const response = await axios.post(URI_MAP.cmg.create_link, {...props}, {
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