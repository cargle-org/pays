import React, { useEffect, useState } from 'react'
import Currency from "../../assets/naira.svg"
import styles from "../../styles/components/maindashboardpage.module.css"
import { getProfile } from '../api/profile/getProfile';

function Metrics() {

    const [data, setData] = useState("")

    useEffect(() => {
        (async () => {
        const res = await getProfile();
          setData(res)
          })();
      }, []);

  return (
    <div className={styles.metrics}>
    <div className={styles.card}>
        <Currency />
        <h6>Account Balance</h6>
        <h2>₦{data?.walletBalance}</h2>
    </div>
        <div className={styles.card}>
            <Currency />
            <h6>Total Vouchers</h6>
            <h2>{data?.totalVouchers}</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Amount Cashed</h6>
            <h2>₦{data?.totalAmountCashed}</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Active Vouchers</h6>
            <h2>{data?.activeVouchers}</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Pending vouchers</h6>
            <h2>{data?.totalVouchers}</h2>
        </div>
    </div>
  )
}

export default Metrics