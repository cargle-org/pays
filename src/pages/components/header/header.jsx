import React, { useState } from "react";
import styles from "../../../styles/header.module.css";
import { useRouter } from "next/router";
import { getToken } from "@/pages/api/auth/auth";
import MenuIcon from "../../../assets/menu.svg";
import CloseIcon from "../../../assets/close.svg";

function Header() {
  const router = useRouter();
  const token = getToken();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <img
            src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681115530/Group_1000000881_edg81o.png"
            alt=""
          />
        </div>
        <div className={styles.navLinks}>
          <li className={styles.link} onClick={() => router.push("/")}>Home</li>
          <li className={styles.link} onClick={() => router.push("/about_us")}>About</li>
          <li className={styles.link} onClick={() => router.push("/faqs")}>FAQs</li>
          <li className={styles.link} onClick={() => router.push("/dashboard")}>Contact</li>
        </div>
        {token ? (
          <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        ) : (
          <div className={styles.buttons}>
            <button
              className={styles.btn}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button onClick={() => router.push("/register")}>Sign Up</button>
          </div>
        )}
        <div className={styles.mobileMenu}>
          <div className={styles.menu} onClick={() => setOpenMenu(true)}>
            <MenuIcon className={styles.icon}/>
          </div>
          {openMenu && (
            <div className={styles.menuLinks}>
              <li onClick={() => setOpenMenu(false)}>
                <CloseIcon className={styles.icon}/>
              </li>
              <li>Home</li>
              <li>About</li>
              <li>FAQs</li>
              <li>Contact</li>
              <li><button
              className={styles.btn}
              onClick={() => router.push("/login")}
            >
              Login
            </button></li>
              <li>            <button onClick={() => router.push("/register")}>Sign Up</button>
</li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
