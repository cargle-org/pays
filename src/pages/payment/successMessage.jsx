import React from "react";
import styles from "../../styles/components/successmessage.module.css";
import { useRouter } from "next/router";

function SuccessMessage() {
  const router = useRouter();
  return (
    <div className={styles.successMessage}>
      <div className={styles.message}>
        <img
          src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677864171/chike/91068-message-sent-successfully-plane_1_dtltch.gif"
          alt=""
        />
        <h6>Your Deposit of ₦500 was successful</h6>
        <div className={styles.buttons}>
          <button onClick={() => router.push("/payment")}>Go to wallet</button>
          <button onClick={() => router.push("/createvouchers")}>
            Create Voucher
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
