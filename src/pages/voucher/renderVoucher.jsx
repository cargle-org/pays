import React from 'react'
import styles from "../../styles/components/maindashboardpage.module.css"
import VoucherBody from './voucherBody'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'

function RenderVoucher() {
  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
                <VoucherBody />
            </div>
        </div>
    </div>
  )
}

export default RenderVoucher