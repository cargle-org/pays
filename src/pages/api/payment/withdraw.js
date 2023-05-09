import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const withdraw = async (props) => {
  const token = getToken();

  try {
    const response = await axios.post(URI_MAP.cmg.withdraw_from_wallet, {
      amount: props.withdrawAmount,
      destinationBankCode: props.bankCode,
      destinationAccountNumber: props.accountNumber,
      destinationAccountName: props.destinationAccountName,
    }, {
      headers: {
        "x-access-token": `${token}`,
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    });
    console.log('response :>> ', response);
    return response.data.success;
  } catch (error) {
    console.log("error", error);
    // setErrorMsg(error);
    // setIsLoading(false);
  }
};
