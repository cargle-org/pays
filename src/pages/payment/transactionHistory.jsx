import React, { useEffect, useState } from "react";
import styles from "../../styles/components/voucherpage.module.css";
import { getTransactions } from "../api/payment/getTransactions";
import { handleSlice } from "../components/timeFormat";
import { verifyPayment } from "../api/payment/verifyPayment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TransactionHistory() {
  const [data, setData] = useState([]);

  const notify = ({ message }) => toast(message);

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
  const handleVerifyPayment = async (paymentReference) => {
    const res = await verifyPayment({paymentReference})
    if (res) {
        const message = res;
      notify({ message });
    } else {
        const message = "Your payment verification failed";
      notify({ message });
    }
  }
  return (
    <div id={styles.table}>
        <ToastContainer />
      <br />
      <h3>Transaction history</h3>
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
          {data?.map((transaction, index) => (
            <tr
              key={transaction?._id}
            >
              <td>{index + 1}</td>
              <td>{transaction?.amount}</td>
              <td>{transaction?.status}</td>
              <td>N{transaction?.transactionReference}</td>
              <td>{handleSlice(transaction?.createdAt)}</td>
              <td>N{transaction?.type}</td>
              <td>{transaction.status === "initiated" ? <button onClick={() => handleVerifyPayment(transaction.paymentReference)}>Verify</button> : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;
