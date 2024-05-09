import React, { useEffect, useMemo, useState } from "react";
import styles from "../../styles/components/voucherpage.module.css";
import { getTransactions } from "../api/payment/getTransactions";
import { handleSlice } from "../components/timeFormat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransactionHistory() {
  const [data, setData] = useState([]);

  const sortedData = useMemo(() => {
    let newData = [...data];
    return newData.sort(
      (a, b) => new Date(b?.createdAt)
       - new Date(a?.createdAt),
    )
  }, [data])

  useEffect(() => {
    (async () => {
      const res = await getTransactions();
      if (res) {
        setData(res);
      } else {
        setData([]);
      }
    })();
  }, []);

  return (
    <div className={styles.voucher}>
        <ToastContainer />
      <br />
      <h3>Transaction history</h3>
    <div id={styles.table}>
    <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction Ref</th>
            <th>Transaction time</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((transaction, index) => (
            <tr
              key={transaction?._id}
            >
              <td>{index + 1}</td>
              <td>₦{transaction?.amount}</td>
              <td>{transaction?.status}</td>
              <td>{transaction?.transactionReference}</td>
              <td>{handleSlice(transaction?.createdAt)}</td>
              <td>{transaction?.type}</td>
              {/* <td>{transaction.status === "initiated" ? <button onClick={() => handleVerifyPayment(transaction.tx_ref, transaction._id)}>Verify</button> : ""}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default TransactionHistory;
