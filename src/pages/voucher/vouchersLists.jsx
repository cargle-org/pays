import React, { useState } from "react";
import styles from "../../styles/components/onevoucher.module.css";
import SearchIcon from "../../assets/search.svg";
import { MdContentCopy } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { EmailIcon, FacebookIcon, LinkedinIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

const  customStyles = {
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

function VouchersLists({ data, notify }) {
  const [tab, setTab] = useState(1);
  const [copySuccess, setCopySuccess] = useState("");
  const [filteredData, setFilteredData] = useState(data?.voucherCoupons);

  const handleFilterVoucherStatus = (status) => {
    if (data) {
      const filteredArray = data.voucherCoupons?.filter(
        (item) => item.status === status
      );
      setFilteredData(filteredArray);
    } else {
      setFilteredData([]);
    }
  };

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

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className={styles.table}>
      <div className={styles.tabs}>
        <div
          onClick={() => {
            setTab(1);
            setFilteredData(data?.voucherCoupons);
          }}
          className={tab === 1 ? styles.activeTab : styles.tab}
        >
          All Vouchers
        </div>
        <div
          onClick={() => {
            setTab(2);
            handleFilterVoucherStatus("pending");
          }}
          className={tab === 2 ? styles.activeTab : styles.tab}
        >
          Active
        </div>
        <div
          onClick={() => {
            setTab(3);
            handleFilterVoucherStatus("cashed");
          }}
          className={tab === 3 ? styles.activeTab : styles.tab}
        >
          History
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.input}>
          <SearchIcon /> <input type="text" placeholder="Search" />
        </div>
      </div>
      <div id="table">
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>VoucherCode</th>
              <th>Status</th>
              <th>Cashed By</th>
              <th>Cashed Time</th>
              <th>Copy</th>
              <th>Share</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((voucher) => (
              <tr key={voucher.couponId}>
                <td>{voucher.couponId}</td>
                <td>{voucher.couponCode}</td>
                <td>
                  {voucher.status === "pending" ? (
                    <div className={styles.pending}>pending</div>
                  ) : (
                    <div className={styles.cashed}>cashed</div>
                  )}
                </td>
                <td>{voucher.cashedBy}</td>
                <td>{voucher.cashedDate}</td>
                <td
                  onClick={() => {
                    copyToClipBoard(voucher.couponCode);
                    notify(voucher.couponCode);
                  }}
                >
                  <MdContentCopy /> copy
                </td>
                <td onClick={openModal}>
                  <FaShare /> share
                </td>
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
            <h3 ref={(_subtitle) => (subtitle = _subtitle)}>
              Filter your vouchers
            </h3>
            <GrClose onClick={closeModal} style={{ fontSize: 24 }} />
          </div>
          <br />
          <TwitterIcon size={48} round={true} />
          <FacebookIcon url={`www.facebook.com`}  quote={`${voucher.couponCode}`} size={48} round={true} />
          <LinkedinIcon size={48} round={true} />
          <EmailIcon   size={48} round={true} />
          <WhatsappIcon size={48} round={true} />
          <TelegramIcon size={48} round={true} />
          {/* <div className={styles.buttons}>
            <br />
            <button style={{opacity: 0}}>close</button>
            <button  style={{ background: "#008000", marginRight: 16 }}>Reset</button>
            <button >Apply</button>
          </div> */}
        </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VouchersLists;
