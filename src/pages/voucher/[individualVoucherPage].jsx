import React, { useEffect, useState } from "react";
import TopBar from "../components/header/topBar";
import Sidebar from "../components/sidebar/sidebar";
import styles from "../../styles/components/maindashboardpage.module.css";
import { useRouter } from "next/router";
import { getOneVoucher } from "../api/vouchers/getOneVoucher";
import VouchersLists from "./vouchersLists";
import { useSidebarContext } from "../context/sidebarContext";
import VoucherDetailsCard from "./voucherDetailsCard";

function IndividualVoucherPage() {
  const router = useRouter();
  const { setActiveTab } = useSidebarContext();

  const id = router.query.individualVoucherPage;

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getOneVoucher({ id });
      setData(res);

      console.log("res", res);
      // if (!res) {
      //   setData([]);
      // } else {
      // }
    })();
    setActiveTab(2);
  }, [id]);

  return (
    <div className={styles.mainDashboardPage}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainSection}>
        <TopBar />
        <div
          className={styles.body}
          style={{ padding: 20, background: "#fff" }}
        >
          <div className={styles.back}>Back</div>
          {data ? (
            <>
              <h4 style={{ margin: "20px 0" }}>{data.title}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <VoucherDetailsCard data={data} />
                <VouchersLists data={data} />
              </div>
            </>
          ) : (
            <div>
              <h3>No data to render</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndividualVoucherPage;
