import React from "react";
import styles from "../../styles/components/successmessage.module.css";
import { useRouter } from "next/router";
import Header from "../components/header/header";

function SuccessMessage() {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className={styles.successMessage}>
        <div className={styles.message}>
          <img
            src="https://res?.cloudinary.com/dmixz7eur/image/upload/v1677864171/chike/91068-message-sent-successfully-plane_1_dtltch.gif"
            alt=""
          />
          <h6>
            Hurray!!! your gifts have been cashed, that was awesome right? do
            more with cmg.
          </h6>
          <div className={styles.buttons}>
            <button onClick={() => router.push("/cashout")}>
              Cash another gift
            </button>
            <button onClick={() => router.push("/createvouchers")}>
              Create a voucher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessMessage;
