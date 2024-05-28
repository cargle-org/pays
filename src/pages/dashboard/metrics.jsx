import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/components/maindashboardpage.module.css";
import { getProfile } from "../api/profile/getProfile";
import { getUserDetails } from "../api/auth/auth";

function Metrics() {
	const [userData, setData] = useState("");
	const [bal, setBalance] = useState("**");
	const [totalVouchers, setTotalVoucherse] = useState("**");
	const [amtCashed, setAmtCashed] = useState("**");
	const [activeVouchers, setActiveVouchers] = useState("**");
	const [cashedVouchers, setCashedVouchers] = useState("**");

	useEffect(() => {
		(async () => {
			const res = await getProfile();
			setBalance(
				new Intl.NumberFormat().format(res.walletBalance && res.walletBalance)
			);
			setTotalVoucherse(res.totalVouchers);
			setAmtCashed(res.totalAmountCashed);
			setActiveVouchers(res.activeVouchers);
			setCashedVouchers(res.cashedVouchers);
		})();
	}, []);

	return (
		<div className={styles.metrics}>
			<div className={styles.card}>
				<h6>Account Balance</h6>
				<h4>₦{bal}</h4>
			</div>
			<div className={styles.card}>
				<h6>Total Vouchers</h6>
				<h4>{totalVouchers}</h4>
			</div>
			<div className={styles.card}>
				<h6>Amount Cashed</h6>
				<h4>₦{amtCashed}</h4>
			</div>
			<div className={styles.card}>
				<h6>Active Vouchers</h6>
				<h4>{activeVouchers}</h4>
			</div>
			<div className={styles.card}>
				<h6>Cashed vouchers</h6>
				<h4>{cashedVouchers}</h4>
			</div>
		</div>
	);
}

export default Metrics;
