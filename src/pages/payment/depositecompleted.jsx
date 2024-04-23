import React, { useEffect } from "react";
import { verifyPayment } from "../api/payment/verifyPayment";
import TopBar from "../components/header/topBar";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from 'next/router'
import styles from "../../styles/components/maindashboardpage.module.css"
import SuccessMessage from "./successMessage";

function DepositCompleted() {
  const router = useRouter();

  const { paymentReference } = router.query;


  useEffect(() => {
    (async () => {
      const res = await verifyPayment({ paymentReference });
    })();
  }, [paymentReference]);

  return (
    <div className={styles.mainDashboardPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainSection}>
        <TopBar />
        <div className={styles.body}>
          <SuccessMessage />
        </div>
      </div>
    </div>
  );
}

export default DepositCompleted;
