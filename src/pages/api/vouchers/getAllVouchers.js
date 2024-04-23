import axios from "axios";
import { getToken, getUserId } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

const handleParams = (paramsPayload) => {
  if (!paramsPayload.amount) {
    delete paramsPayload.amount;
  }  if (!paramsPayload.from) {
    delete paramsPayload.from;
  }  if (!paramsPayload.to) {
    delete paramsPayload.to;
  }
   if (!paramsPayload.status) {
    delete paramsPayload.status;
  } 
  return paramsPayload;
};

export const getAllVouchers = async (props) => {
  const token = getToken();
  const id = getUserId();


  const params = {
    userId: id,
    amount: props.amount,
    from: props.fromDate,
    to: props.toDate,
    status: props.status,
  };


  try {
    const response = await axios.get(
      `${URI_MAP.cmg.get_all_vouchers}?${new URLSearchParams( handleParams(params)).toString()}`,
      // null,
      {
        headers: {
          "x-access-token": `${token}`,
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("response", response.data.data.vouchers);
    return response.data.data.vouchers;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
