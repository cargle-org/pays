import React from 'react'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'
import DashboardBody from './dashboardBody'
import styles from "../../styles/components/maindashboardpage.module.css"
import Metrics from './metrics'

function RenderDashboard() {
  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
                <Metrics />
                <DashboardBody />
            </div>
        </div>
    </div>
  )
}

export default RenderDashboard