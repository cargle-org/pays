import React, { useEffect, useState } from "react";
import { getBanks } from "../api/cashout/getAllBank";
import styles from "../../styles/components/cashoutvoucher.module.css";
import { cashoutVoucher } from "../api/cashout/cashoutVoucher";

function CashoutVoucher() {
  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getBanks();
      setBankName(res);
    })();
  }, []);

  const handleCashoutVoucher = async () => {
    const res = await cashoutVoucher({
      fullName,
      accountNumber,
      voucherCode,
      bankCode,
    });
  };

  return (
    <div className={styles.cashout}>
      <div className={styles.container}>
        <div className={styles.details}>
          <h3>Cashout Voucher</h3>
          <h6></h6>
          <div className={styles.one}>
            <label>Full Account Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full account name"
            />
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
          <div className={styles.one}>
            <label>Bank</label>
            <select
              name="banks"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
            >
              {bankName?.map((banks) => (
                <option key={banks.id} value={banks.code}>
                  {banks.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.one}>
            <label>Voucher Code</label>
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Enter your voucher code e.g XXX-638-hs8wn"
            />
          </div>
          <button onClick={handleCashoutVoucher}>Cashout Voucher</button>
        </div>
      </div>
    </div>
  );
}

export default CashoutVoucher;
