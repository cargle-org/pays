import React, { useEffect } from "react";
import { verifyPayment } from "../api/payment/verifyPayment";

function DepositeCompleted() {
  const url = window.location.href;

  const searchParams = new URLSearchParams(new URL(url).search);

  const status = searchParams.get("status");
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  useEffect(() => {
    (async () => {
      const res = await verifyPayment({ status, tx_ref, transaction_id });
    })();
    setActiveTab(3);
  }, [id]);

  return (
    <div className={styles.mainDashboardPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainSection}>
        <TopBar />
        <div className={styles.body}>
          <div className={styles.successMessage}>
            <div className={styles.message}>
              <h5>Your Deposit of ₦500 was successful</h5>
              <div className={styles.buttons}>
                <button>Go to wallet</button>
                <button>Create Voucher</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositeCompleted;
