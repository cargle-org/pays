import React from "react";
import Naira from "../../../assets/naira.svg"
import styles from '../../../styles/components/topbar.module.css'

function TopBar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.message}>
        <h3>Hello Chike✋</h3>
        <h6>Your dashboard today</h6>
      </div>
      <div className={styles.balance}><Naira /><h5>₦234,620.00</h5></div>
    </div>
  );
}

export default TopBar;
