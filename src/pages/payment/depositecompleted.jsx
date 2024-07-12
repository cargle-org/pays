import React, { useEffect } from "react";
import { verifyPayment } from "../api/payment/verifyPayment";
import TopBar from "../components/header/topBar";
import Sidebar from "../components/sidebar/sidebar";
import { useRouter } from "next/router";
import styles from "../../styles/components/maindashboardpage.module.css";
import SuccessMessage from "./successMessage";
import { toast } from "react-toastify";
import axios from "axios";
import { getToken } from "../api/auth/auth";

function DepositCompleted() {
  const router = useRouter();
  const token = getToken();

  const notify = ({ message }) => toast(message);

  // Extract query parameters
  const { status, tx_ref, transaction_id } = router.query;

  const handleVerifyPayment = async () => {
    axios
      .get(
        `https://cashmygift-api-production-a5e6.up.railway.app/api/utils/wallet/verifyTrx?tx_ref=${tx_ref}&transaction_id=${transaction_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      )
      .then((res) => {
        const message = res?.message;
        notify({ message });
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch((error) => {
        const message = error.response.data.message;
        notify({ message });
      });
  };

  useEffect(() => {
    handleVerifyPayment();
  }, [status, transaction_id]);

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
