import React, { useState } from "react";
import CreateIcon from "../../assets/create.svg";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter.svg";
import EditIcon from "../../assets/edit.svg";
import styles from "../../styles/components/voucherpage.module.css"

function DashboardBody() {

  const [tab, setTab] = useState(1)
  return (
    <div className={styles.voucher}>
      <div className={styles.title}>
        <h3>Vouchers</h3>
        <div className={styles.action}>
          <button>
            <CreateIcon /> Create Voucher
          </button>
        </div>
      </div>
      <div className={styles.tabs}>
        <div onClick={() => setTab(1)} className={tab === 1 ? styles.activeTab : styles.tab }>All Vouchers</div>
        <div onClick={() => setTab()} className={tab === 2 ? styles.activeTab : styles.tab }>Active</div>
        <div onClick={() => setTab(3)} className={tab === 3 ? styles.activeTab : styles.tab }>History</div>
      </div>
      <div className={styles.search}>
        <div className={styles.input}>
          <SearchIcon /> <input type="text" placeholder="Search" />
        </div>
        <div className={styles.filter}>
          <FilterIcon /> Filter
        </div>
      </div>
      <div id={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Img</th>
              <th>Title</th>
              <th>Description</th>
              <th>Total Amount</th>
              <th>Total Vouchers</th>
              <th>Voucher Cashed</th>
              <th>Cashed Percentage</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>
                  <img src="" alt="" />
                </td>
                <td>You can use grid layouts</td>
                <td>using regular grid components inside the modal content.</td>
                <td>N24,000.00</td>
                <td>320</td>
                <td>117</td>
                <td>
                <progress id="file" value="32" max="100"> 32% </progress>
                </td>
                <td>
                  <EditIcon />
                </td>
              </tr>
              <tr>
                <td>
                  <img src="" alt="" />
                </td>
                <td>You can use grid layouts</td>
                <td>using regular grid components inside the modal content.</td>
                <td>N24,000.00</td>
                <td>320</td>
                <td>117</td>
                <td>
                <progress id="file" value="32" max="100"> 32% </progress>
                </td>
                <td>
                  <EditIcon />
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardBody;
