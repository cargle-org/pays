import React, { useEffect, useMemo, useState } from "react";
import styles from "../../styles/components/voucherpage.module.css";
import { getTransactions } from "../api/payment/getTransactions";
import { handleSlice } from "../components/timeFormat";
import { verifyPayment } from "../api/payment/verifyPayment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function TransactionHistory() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const sortedData = useMemo(() => {
    let newData = [...data];
    return newData.sort(
      (a, b) => new Date(b?.createdAt)
       - new Date(a?.createdAt),
    )
  }, [data])

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

  // useEffect(() => {
  //   // Automatically trigger verification after successful payment
  //   sortedData.forEach((transaction) => {
  //     if (transaction.status === "initiated") {
  //       handleVerifyPayment(transaction.paymentReference);
  //     }
  //   });
  // }, [sortedData]);

  const handleVerifyPayment = async (paymentReference) => {
    const res = await verifyPayment({paymentReference})
    if (res) {
        const message = res;
        notify({ message });
      setTimeout(() => {
        router.reload();
      }, 2000)
    } else {
        const message = "Your payment verification failed";
      notify({ message });
    }
  }
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
              <td>{transaction.status === "initiated" ? <button onClick={() => handleVerifyPayment(transaction.paymentReference)}>Verify</button> : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default TransactionHistory;
