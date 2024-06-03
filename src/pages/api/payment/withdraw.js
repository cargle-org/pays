import axios from "axios";
import { getToken } from "../auth/auth";
import URI_MAP from "../URI/URI_MAP";

export const withdraw = ({ withdrawAmount, bankCode, accountNumber }) => {
	const token = getToken();
	return new Promise(async (resolve, reject) => {
		try {
			console.log({
				token,
				amount: withdrawAmount,
				bankCode: bankCode,
				accountNumber: accountNumber,
			});

			const response = await axios.post(
				URI_MAP.cmg.withdraw_from_wallet,
				{
					amount: withdrawAmount,
					bankCode: bankCode,
					accountNumber: accountNumber,
				},
				{
					headers: {
						"x-access-token": token,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.success) {
				resolve(response.data);
			} else {
				reject(new Error("Withdrawal failed"));
			}
		} catch (error) {
			console.log("error", error);
			reject(error);
		}
	});
};
