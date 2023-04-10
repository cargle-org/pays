import React from "react";
import styles from "../../../styles/components/aboutus.module.css";
import { VscDebugBreakpointLog } from "react-icons/vsc";

function Mission() {
  return (
    <div className={styles.mission}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.image}>

            <img
              src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681164829/Frame_1000000880_qnlmur.png"
              alt=""
            />
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.content}>
              <h2>Mission</h2>
              <div className={styles.flex}>
                <VscDebugBreakpointLog />
                <h5>convenient, transparent, and trustworthy platform</h5>
              </div>
              <p>
                We are committed to creating a safe and reliable platform for
                all our users, and we strive to provide exceptional customer
                service and support. Our goal is to help our users unlock the
                full value of their gift vouchers while providing a hassle-free
                and secure experience.
              </p>
              <div className={styles.flex}>
                <VscDebugBreakpointLog />
                <h5>Promote gift giving</h5>
              </div>
              <p>
                Give gifts to your loved ones and rewards to your customers with
                gift vouchers that they can redeem in cash.
              </p>
              <div className={styles.flex}>
                <VscDebugBreakpointLog />
                <h5>Keep your details secured</h5>
              </div>
              <p>
                We use advanced encryption and data protection measures to make
                sure  your personal information and voucher details are kept
                safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
