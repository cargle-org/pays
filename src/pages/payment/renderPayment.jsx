import React from 'react'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'
import PaymentAndWithdrawalBody from './paymentAndWithdrawalBody'
import styles from "../../styles/components/maindashboardpage.module.css"

function RenderPayment() {
  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
                <PaymentAndWithdrawalBody />
            </div>
        </div>
    </div>
  )
}

export default RenderPayment