import React, { useContext, useEffect, useState } from 'react'
import styles from "../../styles/components/maindashboardpage.module.css"
import { getProfile } from '../api/profile/getProfile';
import { UserContext } from '../context/userContext';

function Metrics() {

    const [data, setData] = useState("")
    const {userData} = useContext(UserContext);

    useEffect(() => {
        (async () => {
        const res = await getProfile();
          setData(res)
          })();
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