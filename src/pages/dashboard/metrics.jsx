import React from 'react'
import Currency from "../../assets/currency.svg"
import styles from "../../styles/components/maindashboardpage.module.css"

function Metrics() {
  return (
    <div className={styles.metrics}>
    <div className={styles.card}>
        <Currency />
        <h6>Account Balance</h6>
        <h2>56.5k</h2>
    </div>
        <div className={styles.card}>
            <Currency />
            <h6>Total Vouchers</h6>
            <h2>782</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Amount Cashed</h6>
            <h2>23.9k</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Active Vouchers</h6>
            <h2>34</h2>
        </div>
        <div className={styles.card}>
            <Currency />
            <h6>Pending vouchers</h6>
            <h2>345</h2>
        </div>
    </div>
  )
}

export default Metrics