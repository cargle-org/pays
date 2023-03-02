import React from 'react'
import TopBar from '../header/topBar'
import Sidebar from '../sidebar/sidebar'
import CreateVoucherBody from './createVoucherBody'
import styles from "../../../styles/components/maindashboardpage.module.css"

function RenderCreateVoucher() {
  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
                <CreateVoucherBody />
            </div>
        </div>
    </div>
  )
}

export default RenderCreateVoucher