import { getProfile } from "@/pages/api/profile/getProfile";
import React, { useEffect, useState } from "react";
import Naira from "../../../assets/naira.svg"
import styles from '../../../styles/components/topbar.module.css'

function TopBar() {

  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      setBalance(res.walletBalance);
    })();
  }, []);
  return (
    <div className={styles.topbar}>
      <div className={styles.message}>
        <h3>Hello Chike✋</h3>
        <h6>Your dashboard today</h6>
      </div>
      <div className={styles.balance}><Naira /><h5>₦{balance}</h5></div>
    </div>
  );
}

export default TopBar;
