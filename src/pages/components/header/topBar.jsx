import { getProfile } from "@/pages/api/profile/getProfile";
import React, { useEffect, useState } from "react";
import Naira from "../../../assets/naira.svg"
import styles from '../../../styles/components/topbar.module.css'

function TopBar() {

  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      setBalance(new Intl.NumberFormat().format(res.walletBalance));
      setName(res.name)
    })();
  }, []);
  return (
    <div className={styles.topbar}>
      <div className={styles.message}>
        <h3>Hello {name}✋</h3>
        <h6>Your dashboard today</h6>
      </div>
      <div className={styles.balance}><Naira /><h5>₦{balance}</h5></div>
    </div>
  );
}

export default TopBar;
