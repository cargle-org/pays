import React from 'react'
import Sidebar from '../sidebar/sidebar'
import TopBar from '../header/topBar'
import CreatePaymentLink from './createPaymentLinkBody';
import styles from "../../../styles/components/maindashboardpage.module.css"

const renderCreatePaymentLink = () => {
  return (
    <div className={styles.mainDashboardPage}>
    <div className={styles.sidebar}>
        <Sidebar />
    </div>
    <div className={styles.mainSection}>
        <TopBar />
        <div className={styles.body}>
            <CreatePaymentLink />
        </div>
    </div>
</div>
  )
}

export default renderCreatePaymentLink