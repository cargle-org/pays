import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { useRouter } from "next/router";
import styles from "../../../styles/components/aboutus.module.css";
import { getToken } from "@/pages/api/auth/auth";

function Hero() {
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
    <div className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.colOne}>
              <h1>
                About
                <span> Us</span>
              </h1>
              <h5>
                Unlock the total value of your gift vouchers and redeem them in
                cash with <span>usepays.co</span> - the safe, reliable, and
                user-friendly platform for creating and cashing out your gift
                vouchers.
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
            </div>
            <div className={styles.colTwo}>
              <img
                src="https://res?.cloudinary.com/dmixz7eur/image/upload/v1681156945/Group_1000000882_ecczgz.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
