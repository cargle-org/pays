import React, { useEffect, useState } from "react";
import CreateIcon from "../../assets/create.svg";
import SearchIcon from "../../assets/search.svg";
import FilterIcon from "../../assets/filter.svg";
import EditIcon from "../../assets/edit.svg";
import styles from "../../styles/components/voucherpage.module.css"
import { useRouter } from "next/router";
import { getAllVouchers } from "../api/vouchers/getAllVouchers";
import Loading from "../components/loading";

function VoucherBody() {
  const router = useRouter();

  const [tab, setTab] = useState(1);
  const [vouchers, setVouchers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res = await getAllVouchers();
      setVouchers(res)
        setIsLoading(false)
      })();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.voucher}>
      <div className={styles.title}>
        <h3>Vouchers</h3>
        <div className={styles.action}>
          <button onClick={() => router.push("/createvouchers")}>
            <CreateIcon /> Create Voucher
          </button>
        </div>
      </div>
      <div className={styles.tabs}>
        <div onClick={() => setTab(1)} className={tab === 1 ? styles.activeTab : styles.tab }>All Vouchers</div>
        <div onClick={() => setTab(2)} className={tab === 2 ? styles.activeTab : styles.tab }>Active</div>
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
              <th style={{minWidth: 300}}>Description</th>
              <th>Total Amount</th>
              <th>Total Vouchers</th>
              <th>Voucher Cashed</th>
              <th>Cashed Percentage</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (

              <tr key={voucher._id}
              onClick={() =>
                router.push({
                  pathname: "/voucher/[individualVoucherPage]",
                  query: { individualVoucherPage: voucher._id },
                })
              }
              >
                <td>
                  <img src={voucher.thumbnail} alt="" />
                </td>
                <td>{voucher.title}</td>
                <td>{voucher.description}</td>
                <td>N{voucher.totalAmount}</td>
                <td>{voucher.totalNumberOfVouchers}</td>
                <td>N{voucher.totalCashedAmount}</td>
                <td>
                <progress id="file" value={voucher.totalCashedAmount} max={voucher.totalAmount}> {voucher.totalCashedAmount}</progress>
                </td>
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

export default VoucherBody;
