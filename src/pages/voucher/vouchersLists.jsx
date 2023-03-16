import React, { useState } from "react";
import styles from "../../styles/components/onevoucher.module.css";
import SearchIcon from "../../assets/search.svg";
import EditIcon from "../../assets/edit.svg";

function VouchersLists({ data }) {
  const [tab, setTab] = useState(1);
  return (
    <div className={styles.table}>
      <div className={styles.tabs}>
        <div
          onClick={() => setTab(1)}
          className={tab === 1 ? styles.activeTab : styles.tab}
        >
          All Vouchers
        </div>
        <div
          onClick={() => setTab()}
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
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.voucherCoupons?.map((voucher) => (
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
              <td>
                <EditIcon />
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
