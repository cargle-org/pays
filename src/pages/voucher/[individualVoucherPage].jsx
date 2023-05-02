import React, { useEffect, useState } from "react";
import TopBar from "../components/header/topBar";
import Sidebar from "../components/sidebar/sidebar";
import styles from "../../styles/components/maindashboardpage.module.css";
import { useRouter } from "next/router";
import { getOneVoucher } from "../api/vouchers/getOneVoucher";
import VouchersLists from "./vouchersLists";
import { useSidebarContext } from "../context/sidebarContext";
import VoucherDetailsCard from "./voucherDetailsCard";
import Loading from "../components/loading";
import MobileSidebar from "../components/sidebar/mobileSidebar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function IndividualVoucherPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const notify = (voucher_code) => toast(`Voucher code ${voucher_code} copied successfully`);
  
  const { setActiveTab } = useSidebarContext();

  const id = router.query.individualVoucherPage;

  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
    setIsLoading(true)
    const res = await getOneVoucher({ id, status });
      setData(res);

      setIsLoading(false)
    })();
    setActiveTab(2);
  }, [id, status]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.mainDashboardPage}>
      <ToastContainer/>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
        <div className={styles.mobileNav}>

            <MobileSidebar />
          </div>
      <div className={styles.mainSection}>
        <TopBar />
        <div
          className={styles.body}
          style={{ padding: 20, background: "#fff" }}
        >
          <div className={styles.back} onClick={() => router.back()}>Back</div>
          {data ? (
            <>
              <h4 style={{ margin: "20px 0" }}>{data.title}</h4>
              <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                <VoucherDetailsCard data={data} />
                <VouchersLists setStatus={setStatus} notify={notify} data={data} />
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
