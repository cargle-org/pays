import React, { useEffect } from "react";
import { useState } from "react";
import MoneyIcon from "../../assets/naira.svg";
import styles from "../../styles/components/paymentpage.module.css";
import { fundWallet } from "../api/payment/fundWallet";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";
import { getBanks } from "../api/cashout/getAllBank";
import { withdraw } from "../api/payment/withdraw";

function PaymentAndWithdrawalBody() {
  const [operation, setOperation] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleOperation = (e) => {
    setOperation(e.target.value);
  };

  const myDeposit = new Intl.NumberFormat().format(depositAmount);
  const myWithdrawal = new Intl.NumberFormat().format(withdrawAmount);

  const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getProfile();
      setBalance(new Intl.NumberFormat().format(res.walletBalance));
      setIsLoading(false);
      const result = await getBanks();
      setBankName(result);
    })();
  }, []);

  const handleDeposit = async () => {
    const res = await fundWallet({ depositAmount });
    const newWindow = window.open(res, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const handleWithdraw = async () => {
    setErrMsg("")
    const res = await withdraw({ withdrawAmount, bankCode, accountNumber });
    if (res) {
      setWithdrawSuccess(true);
    } else {
      setWithdrawSuccess(false);
      setErrMsg("Withdrawal failed, please try again");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.payment}>
      <h3>Deposit Withdrawal</h3>
      <h5>
        Balance: <span>₦{balance}</span>
      </h5>
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
            {!withdrawSuccess ? (
              <div>
                {errMsg ? (
                  <div className={styles.error}>{errMsg}</div>
                ) : (
                  <div> </div>
                )}
                <label>Amount</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter the amount you want to withdraw"
                />
                <div className={styles.one}>
                  <label>Bank</label>
                  <select
                    name="banks"
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                  >
                    <option value="">select a bank</option>
                    {bankName?.map((banks) => (
                      <option key={banks.id} value={banks.code}>
                        {banks.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.one}>
                  <label>Account Number</label>
                  <input
                    type="number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                <button onClick={handleWithdraw}>
                  Withdraw ({myWithdrawal})
                </button>
              </div>
            ) : (
              <div className={styles.message}>
        <img
          src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677864171/chike/91068-message-sent-successfully-plane_1_dtltch.gif"
          alt=""
        />
        <h6>Your withdrawal was successful</h6>
        <div className={styles.buttons}>
          <button onClick={() => router.push("/payment")}>Ok Thanks</button>
        </div>
      </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentAndWithdrawalBody;
