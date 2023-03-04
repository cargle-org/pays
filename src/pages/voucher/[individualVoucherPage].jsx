import React, { useEffect, useState } from 'react'
import TopBar from '../components/header/topBar'
import Sidebar from '../components/sidebar/sidebar'
import styles from "../../styles/components/maindashboardpage.module.css"
import VoucherDetailsCard from './VoucherDetailsCard';
import { useRouter } from "next/router";
import { getOneVoucher } from '../api/vouchers/getOneVoucher';

function IndividualVoucherPage() {
  const router = useRouter();

  const id = router.query.individualVoucherPage;

  const [data, setData] = useState([])

  useEffect(() => {

    (async () => {
      const res = await getOneVoucher({id});
      setData(res)
    })();
    // setActiveTab(3);
  }, [id]);

  return (
    <div className={styles.mainDashboardPage}>
        <div className={styles.sidebar}>
            <Sidebar />
        </div>
        <div className={styles.mainSection}>
            <TopBar />
            <div className={styles.body}>
              <VoucherDetailsCard data={data}/>
            </div>
        </div>
    </div>
  )
}

export default IndividualVoucherPage