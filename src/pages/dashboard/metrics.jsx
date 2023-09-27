import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/components/maindashboardpage.module.css"
import { getProfile } from '../api/profile/getProfile';
import { getUserDetails } from '../api/auth/auth';

function Metrics() {

    const [userData, setData] = useState("")

    useEffect(() => {
        const data = getUserDetails();
        setData(data);
      }, []);

  return (
    <div className={styles.metrics}>
    <div className={styles.card}>
        <h6>Account Balance</h6>
        <h2>₦{userData?.walletBalance}</h2>
    </div>
        <div className={styles.card}>
            <h6>Total Vouchers</h6>
            <h2>{userData?.totalVouchers}</h2>
        </div>
        <div className={styles.card}>
            <h6>Amount Cashed</h6>
            <h2>₦{userData?.totalAmountCashed}</h2>
        </div>
        <div className={styles.card}>
            <h6>Active Vouchers</h6>
            <h2>{userData?.activeVouchers}</h2>
        </div>
        <div className={styles.card}>
            <h6>Cashed vouchers</h6>
            <h2>{userData?.cashedVouchers}</h2>
        </div>
    </div>
  )
}

export default Metrics