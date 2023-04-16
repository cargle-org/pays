import React, { useEffect, useState } from "react";
import { getBanks } from "../api/cashout/getAllBank";
import styles from "../../styles/components/cashoutvoucher.module.css";
import { cashoutVoucher } from "../api/cashout/cashoutVoucher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Loading from "../components/loading";

function CashoutVoucher() {
  const router = useRouter();

  const [bankName, setBankName] = useState([]);
  const [bankCode, setBankCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const notify = ({ message }) => toast(message);

  useEffect(() => {
    (async () => {
      const res = await getBanks();
      setBankName(res);
    })();
  }, []);

  const handleCashoutVoucher = async () => {
    setIsLoading(true);
    const res = await cashoutVoucher({
      fullName,
      accountNumber,
      voucherCode,
      bankCode,
    });
    if (res.success === true) {
      setIsLoading(false);
      const message = "Your Voucher reward has been claimed successfully";
      notify({ message });
      router.push("/cashout/success");
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
      const message = res.message;
      notify({ message });
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.cashout}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            <div className={styles.logo} onClick={() => router.push("/")}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681115530/Group_1000000881_edg81o.png"
                alt=""
              />
            </div>
            <div className={styles.details}>
              <h3>Redeem your gift vouchers</h3>
              <p>
                Got unused gift vouchers? We’ve got you covered. Just type in a
                few details to exchange your vouchers for cash and get credited
                immediately.
              </p>
              <ToastContainer />
              <h6></h6>
              <div className={styles.one}>
                {errorMessage ? (
                  <div className={styles.error}>{errorMessage}</div>
                ) : (
                  <div> </div>
                )}
              </div>
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
                  <option value="">select a bank</option>
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
          <div className={styles.colOne}>
            <img
              src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashoutVoucher;
