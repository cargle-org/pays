import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const verifyPayment = async (props) => {
  const token = getToken();
  const params = {
    paymentReference: props.paymentReference,
    // tx_ref: props.tx_ref,
    // transaction_id: props.transaction_id,
  };
  try {
    const response = await axios.get(
      `${URI_MAP.cmg.verify_payment}?${new URLSearchParams(params).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
