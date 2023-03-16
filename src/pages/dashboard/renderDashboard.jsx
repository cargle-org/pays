import React from 'react'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'
import styles from "../../styles/components/maindashboardpage.module.css"
import Metrics from './metrics'
import VoucherBody from '../voucher/voucherBody'
import MobileSidebar from '../components/sidebar/mobileSidebar'

function RenderDashboard() {
  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mobileNav}>

            <MobileSidebar />
          </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
                <Metrics />
                <VoucherBody />
            </div>
        </div>
    </div>
  )
}

export default RenderDashboard