import axios from "axios";
import URI_MAP from "./URI/URI_MAP";

export const contactUs = async (props) => {

  try {
    const response = await axios.post(URI_MAP.cmg.contact_us, {
      name: props.name,
      email: props.email,
      message: props.message,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data
  }
};
