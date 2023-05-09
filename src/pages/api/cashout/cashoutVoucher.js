import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const cashoutVoucher = async (props) => {
  const token = getToken();

  try {
    const response = await axios.post(URI_MAP.cmg.cashout_a_voucher, {
      fullName: props.fullName,
      voucherCode: props.voucherCode,
      destinationBankCode: props.bankCode,
      destinationAccountNumber: props.accountNumber,
      destinationAccountName: props.destinationAccountName,
      email: props.email,
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
