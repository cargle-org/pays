import axios from "axios";
import URI_MAP from "../URI/URI_MAP";

export const getAVoucherDetails = async (props) => {

  try {
    const response = await axios.post(URI_MAP.cmg.fetch_a_voucher_details, {
      voucherCode: props.voucherCode,
    },);
    console.log('res', response)
    return response.data;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
    return error.response.data
  }
};
