import React from "react";
import styles from "../../../styles/header.module.css";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <img
            src="https://res.cloudinary.com/dmixz7eur/image/upload/v1677542356/chike/CMG_st67ia.png"
            alt=""
          />
        </div>
        <div className={styles.navLinks}>
          <li className={styles.link}>Home</li>
          <li className={styles.link}>About</li>
          <li className={styles.link}>FAQs</li>
          <li className={styles.link}>Contact</li>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn}onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/register")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
