import React, { useEffect } from "react";
import { verifyPayment } from "../api/payment/verifyPayment";
import TopBar from "../components/header/topBar";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from 'next/router'
import styles from "../../styles/components/maindashboardpage.module.css"
import SuccessMessage from "./successMessage";

function DepositCompleted() {
  const router = useRouter();
  const { status } = router.query;
  const { tx_ref } = router.query;
  const { transaction_id } = router.query;
//   console.log('status', status, transaction_id, tx_ref)


  useEffect(() => {
    (async () => {
      const res = await verifyPayment({ status, tx_ref, transaction_id });
    })();
  }, [status, tx_ref, transaction_id]);

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
