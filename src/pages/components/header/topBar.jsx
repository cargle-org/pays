import React, { useContext, useEffect, useState } from "react";
import styles from '../../../styles/components/topbar.module.css'
import { UserContext } from "@/pages/context/userContext";

function TopBar() {

  // const [balance, setBalance] = useState("");
  // const [name, setName] = useState("");
  const {userData} = useContext(UserContext);
  const balance = new Intl.NumberFormat().format(userData?.walletBalance)

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProfile();
  //     setBalance(new Intl.NumberFormat().format(res.walletBalance && res.walletBalance));
  //     // setName(res.name)
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //       const userBal = localStorage?.getItem('userBal');
  //       setBalance(new Intl.NumberFormat().format(userBal));
  //     } else {
  //       console.warn('localStorage is not available.');
  //     }
  //  },[])
  return (
    <div className={styles.topbar}>
      <div className={styles.message}>
        <h3>Hello {userData?.name}✋</h3>
        <h6>Your dashboard today</h6>
      </div>
      <div className={styles.balance}><h5>₦{balance}</h5></div>
    </div>
  );
}

export default TopBar;
