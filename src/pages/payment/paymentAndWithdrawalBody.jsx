import React from "react";
import { useState } from "react";
import MoneyIcon from "../../assets/naira.svg";
import styles from "../../styles/components/paymentpage.module.css"
import { fundWallet } from "../api/payment/fundWallet";

function PaymentAndWithdrawalBody() {
  const [operation, setOperation] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  const handleOperation = (e) => {
    setOperation(e.target.value);
  };


  const handleDeposit = async () => {
    const res = await fundWallet({depositAmount})
    const newWindow = window.open(res, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
  }

  return (
    <div className={styles.payment}>
      <h3>Deposit Withdrawal</h3>
      <h5>Balance: <span>₦234,620.00 </span></h5>
      <div className={styles.container}>
        <div className={styles.type}>
          <div className={styles.one}>
            <input
              type="radio"
              value="deposit"
              name="operation"
              onChange={handleOperation}
            />
            <MoneyIcon />
            <span>Deposit cash</span>
          </div>
          <div className={styles.one}>
            <input
              type="radio"
              value="withdraw"
              name="operation"
              onChange={handleOperation}
            />
            <MoneyIcon />
            <span>Withdraw cash</span>
          </div>
        </div>
        {operation === "deposit" ? (
          <div className={styles.deposit}>
            <label>Amount</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Enter the amount you want to deposit"
            />
            <button onClick={handleDeposit}>Deposit (₦{depositAmount})</button>
          </div>
        ) : (
          <div className={styles.withdraw}>
            <label>Amount</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter the amount you want to withdraw"
            />
            <button>Withdraw ({depositAmount})</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentAndWithdrawalBody;
