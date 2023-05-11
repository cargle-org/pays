import React from "react";
import Header from "../components/header/header";
import styles from "../../styles/Home.module.css";
import { HiArrowUpRight } from "react-icons/hi2";
import { useRouter } from "next/router";
import { getToken } from "../api/auth/auth";
import Metrics from "./metrics";
import Subscribe from "./subscribe";
import Footer from "../components/footer/footer";

function HomePage() {
  const router = useRouter();
  const token = getToken();

  const handleUser = () => {
    if (token) {
      router.push("/createvouchers");
    } else {
      router.push("/login");
    }
  };
  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.colOne}>
              <div>

              <h1>
                Create gift vouchers, <br />
                <span> Redeem gifts in cash</span>
              </h1>
              <h5>
                With Usepays.co, you can design and personalize your gift
                vouchers, and the recipient can choose to cash them out for
                their value. Our platform offers a simple and hassle-free way to
                cash out your gift vouchers and use the cash for anything you
                want.
              </h5>
              <div className={styles.buttons}>
                <div className={styles.btn} onClick={handleUser}>
                Start Here
                  <div className={styles.icon}>
                    <HiArrowUpRight />
                  </div>
                </div>
                <div
                  onClick={() => router.push("/cashout")}
                  className={styles.btnTwo}
                >
                  Cash a gift
                  <div className={styles.icon}>
                    <HiArrowUpRight />
                  </div>
                </div>
              </div>
              <img src="https://res.cloudinary.com/dmixz7eur/image/upload/v1683798079/chike/Group_8_v3ntku.png" alt="" />
              </div>
            </div>  
            <div className={styles.colTwo}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681125297/Group_10_zu4ygs.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Metrics />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default HomePage;
