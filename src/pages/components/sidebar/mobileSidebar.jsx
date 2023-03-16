import React from 'react'
import Dashboardicon from "../../../assets/dashboard.svg";
import Payment from "../../../assets/payment.svg";
import Voucher from "../../../assets/voucher.svg";
import Profile from "../../../assets/profile.svg";
import { useSidebarContext } from '@/pages/context/sidebarContext';
import { useRouter } from 'next/router';
import styles from "../../../styles/components/mobilesidebar.module.css"

function MobileSidebar() {
  const router = useRouter();
  const {activeTab, setActiveTab} = useSidebarContext()
  return (
    <div className={styles.mobileSidebar}>
        <div className={styles.navlinks}>
            <div
              className={activeTab === 1 ? styles.activeLink : styles.link}
              onClick={() => {setActiveTab(1); router.push("/dashboard")}}
            >
              <Dashboardicon  className={styles.sideIcon}/> <li>Dashboard</li>
            </div>
            <div
              className={activeTab === 2 ? styles.activeLink : styles.link}
              onClick={() => {setActiveTab(2); router.push("/vouchers")}}
            >
              <Voucher  className={styles.sideIcon}/> <li>Vouchers</li>
            </div>
            <div
              className={activeTab === 3 ? styles.activeLink : styles.link}
              onClick={() => {setActiveTab(3); router.push("/profile")}}
            >
              <Profile  className={styles.sideIcon}/> <li>Profile</li>
            </div>
            <div
              className={activeTab === 4 ? styles.activeLink : styles.link}
              onClick={() => {setActiveTab(4); router.push("/payment")}}
            >
              <Payment  className={styles.sideIcon}/> <li>Payment & withdrawal</li>
            </div>
          </div>
    </div>
  )
}

export default MobileSidebar