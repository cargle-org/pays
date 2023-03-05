import React from "react";
import styles from "../../../styles/components/sidebar.module.css";
import { useRouter } from "next/router";
import { removeToken } from "@/pages/api/auth/auth";
import Dashboardicon from "../../../assets/dashboard.svg";
import Payment from "../../../assets/payment.svg";
import Voucher from "../../../assets/voucher.svg";
import Profile from "../../../assets/profile.svg";
import { useSidebarContext } from "@/pages/context/sidebarContext";
import Logout from "../../../assets/Logout.svg"

function Sidebar() {
  const router = useRouter();
  const {activeTab, setActiveTab} = useSidebarContext()

  return (
    <div className={styles.desktopSidebar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677542356/chike/CMG_st67ia.png"
            alt=""
          />
        </div>
        <h6>Main Menu</h6>
        <div className={styles.sideLinks}>
          <li onClick={() => {setActiveTab(1); router.push("/dashboard")}} className={activeTab === 1 ? styles.activeLink :styles.link}>
            <Dashboardicon className={styles.icon} />
            <span>Dashboard</span>
          </li>
          <li onClick={() => {setActiveTab(2); router.push("/vouchers")}} className={activeTab === 2 ? styles.activeLink :styles.link}>
            <Voucher className={styles.icon} /> <span>Vouchers</span>
          </li>
          <li onClick={() => {setActiveTab(3); router.push("/profile")}} className={activeTab === 3? styles.activeLink :styles.link}>
            <Profile className={styles.icon} />
            <span>Profile</span>
          </li>
          <li onClick={() => {setActiveTab(4); router.push("/payment")}} className={activeTab === 4? styles.activeLink :styles.link}>
            <Payment className={styles.icon} /> <span>Payment & withdrawal</span>
          </li>
        </div>
        <div className={styles.bottom}>
            <div className={styles.profile}>
              <img src="https://res.cloudinary.com/dmixz7eur/image/upload/v1678013020/chike/3d-avatar-teacher-png_l8hyf7.webp" alt="" />
              <div className={styles.info}>
                <h6 >Dwayne Johnson</h6>
                <p>Jameson & co</p>
              </div>
            </div>
          <li
            onClick={() => {
              removeToken();
              router.push("/login");
            }}
            className={styles.exit}
          >
            <Logout className={styles.icon}/>
            Logout
          </li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
