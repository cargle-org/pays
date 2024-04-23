import React, { useContext, useEffect, useState } from "react";
import styles from '../../../styles/components/topbar.module.css'
import Loading from "../loading";
import { getUserDetails } from "@/pages/api/auth/auth";
import { getProfile } from "@/pages/api/profile/getProfile";

function TopBar() {
  
  const [userData, setUserData] = useState(null)
  const [bal, setBalance] = useState('**')
  useEffect(() => {
    const user = getUserDetails();
    setUserData(user)
  }, [])

  // const [balance, setBalance] = useState("");
  // const [name, setName] = useState("");
  // const userBalance = new Intl.NumberFormat().format(userData?.walletBalance)
  // const [isClient, setIsClient] = useState(false);
 


  useEffect(() => {
    (async () => {
      const res = await getProfile();
      setBalance(new Intl.NumberFormat().format(res.walletBalance && res.walletBalance));
    })();
  }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //       const userBal = localStorage?.getItem('userBal');
  //       setBalance(new Intl.NumberFormat().format(userBal));
  //     } else {
  //       console.warn('localStorage is not available.');
  //     }
  //  },[])
  if (!userData) {
    return <Loading />
  }
  return (
    <div className={styles.topbar}>
     {userData && (
      <><>
          <div className={styles.message}>
            <h3>Hello {userData?.companyName ? userData?.firstName + ' ' + userData?.lastName : userData?.name }✋</h3>
            <h6>Your dashboard today</h6>
          </div>
        </><div className={styles.balance}><h5>₦{bal}</h5></div></>
     )}
    </div>
  );
}

export default TopBar;
