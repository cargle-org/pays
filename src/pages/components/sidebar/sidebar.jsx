import React from "react";
import styles from "../../../styles/components/sidebar.module.css";

function Sidebar() {
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
          <li className={styles.link}>Dashboard</li>
          <li className={styles.link}>Vouchers</li>
          <li className={styles.link}>Profile</li>
          <li className={styles.link}>Payment & withdrawal</li>
        </div>
        <div className={styles.logout}>
            <li className={styles.exit}>Logout</li>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
