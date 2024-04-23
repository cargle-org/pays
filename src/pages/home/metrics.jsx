import React from 'react'
import styles from "../../styles/Home.module.css";

function Metrics() {
  return (
    <div className={styles.metrics}>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.metric}>
                    <h5>Active users</h5>
                    <div className={styles.display}>50k +</div>
                </div>
                <div className={styles.metric}>
                    <h5>Vouchers Cashed</h5>
                    <div className={styles.display}>250k +</div>
                </div>
                <div className={styles.metric}>
                    <h5>Amount Cashed</h5>
                    <div className={styles.display}>1.2b +</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Metrics