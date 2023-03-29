import React, { useEffect } from "react";
import { useState } from "react";
import MoneyIcon from "../../assets/naira.svg";
import styles from "../../styles/components/paymentpage.module.css"
import { fundWallet } from "../api/payment/fundWallet";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";

function PaymentAndWithdrawalBody() {
  const [operation, setOperation] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState(null)
  const [withdrawAmount, setWithdrawAmount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOperation = (e) => {
    setOperation(e.target.value);
  };

  const myDeposit = new Intl.NumberFormat().format(depositAmount)
  const myWithdrawal = new Intl.NumberFormat().format(withdrawAmount)

  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
    setIsLoading(true)
    const res = await getProfile();
      setBalance(new Intl.NumberFormat().format(res.walletBalance));
        setIsLoading(false)
      })();
  }, []);

  const handleDeposit = async () => {
    const res = await fundWallet({depositAmount})
    const newWindow = window.open(res, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.payment}>
      <h3>Deposit Withdrawal</h3>
      <h5>Balance: <span>₦{balance}</span></h5>
      <div className={styles.container}>
        <div className={styles.type}>
          <div className={styles.one}>
            <input
              type="radio"
              value="deposit"
              name="operation"
              defaultChecked
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
              placeholder="0"
            />
            <button onClick={handleDeposit}>Deposit (₦{myDeposit})</button>
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
            <button>Withdraw ({myWithdrawal})</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentAndWithdrawalBody;
