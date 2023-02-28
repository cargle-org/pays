import React from "react";
import Header from "../components/header/header";
import styles from "../../styles/Home.module.css";
import { HiArrowUpRight } from "react-icons/hi2";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.colOne}>
              <h1>Create Vouchers & gift, Cashout your Vouchers</h1>
              <h5>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum
              </h5>
              <div className={styles.buttons}>
                <div className={styles.btn}>
                  Create Vouchers
                  <div className={styles.icon}>
                    <HiArrowUpRight />
                  </div>
                </div>
                <div className={styles.btnTwo}>
                  Cash a gift
                  <div className={styles.icon}>
                    <HiArrowUpRight />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.colTwo}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677536988/chike/CMG_kryufg.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
