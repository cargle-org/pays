import React, { useState } from "react";
import styles from "../../styles/components/onevoucher.module.css";
import SearchIcon from "../../assets/search.svg";
import { MdContentCopy } from "react-icons/md";
import { RWebShare } from "react-web-share";
import { useRouter } from "next/navigation";

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

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(
        `Visit https://www.usepays.co/cashout to claim the voucher: ${copyMe}`
      );
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  const navigator = useRouter();
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
                <td>
                  {/* <FaShare /> share */}

                  <div
                    onClick={() => {
                      // navigator.push(`/pay-link/${1}`);
                      navigator.push(`/pay-link/${voucher.couponCode}`);
                    }}
                  >
                    Share 🔗
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VouchersLists;
