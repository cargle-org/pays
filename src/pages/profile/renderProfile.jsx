import React from 'react'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'
import ProfileBody from './profileBody'
import styles from "../../styles/components/maindashboardpage.module.css"
import MobileSidebar from '../components/sidebar/mobileSidebar'

function RenderProfile() {
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
                <ProfileBody />
            </div>
        </div>
    </div>
  )
}

export default RenderProfile