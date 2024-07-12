import React, { useEffect, useState } from "react";
import CreateIcon from "../../assets/create.svg";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter.svg";
import EditIcon from "../../assets/edit.svg";
import LinkIcon from "../../assets/chain.svg";
import styles from "../../styles/components/voucherpage.module.css";
import { useRouter } from "next/router";
import { getAllVouchers } from "../api/vouchers/getAllVouchers";
import Loading from "../components/loading";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 20px 10px #55555525",
  },
};

function VoucherBody() {
  const router = useRouter();

  const [tab, setTab] = useState(1);
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getAllVouchers({ amount, fromDate, toDate, status });
      setVouchers(res);
      setIsLoading(false);
    })();
  }, [amount, fromDate, status, toDate]);

  const handleGetVouchers = async () => {
    if (!fromDate && toDate) {
      setErrorMsg("you must select a date range");
    } else if (fromDate && !toDate) {
      setErrorMsg("you must select a date range");
    } else {
      setErrorMsg("");
      const res = await getAllVouchers({ amount, fromDate, toDate, status });
      closeModal();
    }
  };
  const handleResetVouchers = () => {
    setAmount("");
    setFromDate("");
    setToDate("");
    setStatus("");
  };
  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className={styles.voucher}>
      <div className={styles.title}>
        <h3>Vouchers</h3>
        <div className={styles.action}>
          <button
            className={styles.linkButton}
            onClick={() => router.push("/paymentlink")}
          >
            <LinkIcon /> Create Payment Link
          </button>
          <button onClick={() => router.push("/createvouchers")}>
            <CreateIcon /> Create Voucher
          </button>
        </div>
      </div>
      {/* <div className={styles.tabs}>
        <div
          onClick={() => setTab(1)}
          className={tab === 1 ? styles.activeTab : styles.tab}
        >
          All Vouchers
        </div>
        <div
          onClick={() => setTab(2)}
          className={tab === 2 ? styles.activeTab : styles.tab}
        >
          Active
        </div>
        <div
          onClick={() => setTab(3)}
          className={tab === 3 ? styles.activeTab : styles.tab}
        >
          History
        </div>
      </div> */}
      <div className={styles.search}>
        <div className={styles.input}>
          <SearchIcon /> <input type="text" placeholder="Search" />
        </div>
        <div className={styles.filter} onClick={openModal}>
          <FilterIcon /> Filter
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 ref={(_subtitle) => (subtitle = _subtitle)}>
            Filter your vouchers
          </h5>
          <GrClose
            onClick={closeModal}
            style={{ fontSize: 24, cursor: "pointer" }}
          />
        </div>
        <br />
        {errorMsg ? (
          <div className={styles.error}>{errorMsg}</div>
        ) : (
          <div></div>
        )}
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />
        <label>From</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <br />
        <br />
        <label>To</label>
        <br />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <br />
        <br />
        <label>Status</label>
        <br />
        <select name="" value={status} id="">
          <option value="">Select an option</option>
          <option value="cashed">Cashed</option>
          <option value="pending">Pending</option>
        </select>
        <div>
          <br />
          <button
            onClick={handleResetVouchers}
            style={{ background: "#008000", marginRight: "16px" }}
          >
            Reset
          </button>
          <button onClick={handleGetVouchers}>Apply</button>
        </div>
      </Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <div id={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Total Amount</th>
                <th>Total Vouchers</th>
                <th>Amount cashed</th>
                <th>Cashed Percentage</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {vouchers?.map((voucher) => (
                <tr
                  key={voucher._id}
                  onClick={() =>
                    router.push({
                      pathname: "/voucher/[individualVoucherPage]",
                      query: { individualVoucherPage: voucher._id },
                    })
                  }
                >
                  <td>
                    {voucher.thumbnail === "" ? (
                      <img src="/createVoucher.svg" alt="voucher" />
                    ) : (
                      <img src={voucher.thumbnail} alt="" />
                    )}
                  </td>
                  <td>{voucher.title}</td>
                  <td>{voucher.description}</td>
                  <td>₦{voucher.totalAmount}</td>
                  <td>{voucher.totalNumberOfVouchers}</td>
                  <td>₦{voucher.totalCashedAmount}</td>
                  <td>
                    <progress
                      id="file"
                      value={voucher.totalCashedAmount}
                      max={voucher.totalAmount}
                    >
                      {" "}
                      {voucher.totalCashedAmount}
                    </progress>
                  </td>
                  <td>
                    <EditIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VoucherBody;
