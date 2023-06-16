import React, { useState } from "react";
import styles from "../../../styles/header.module.css";
import { useRouter } from "next/router";
import { getToken } from "@/pages/api/auth/auth";
import MenuIcon from "../../../assets/menu.svg";
import CloseIcon from "../../../assets/close.svg";
import Logo from "../../../assets/logo.svg";
import { useSidebarContext } from "@/pages/context/sidebarContext";

function Header() {
  const router = useRouter();
  const token = getToken();

  const [openMenu, setOpenMenu] = useState(false);
  const { activePage, setActivePage } = useSidebarContext();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Logo />
        </div>
        <div className={styles.navLinks}>
          <li
            className={activePage === 1 ? styles.activeLink : styles.link}
            onClick={() => {
              router.push("/");
              setActivePage(1);
            }}
          >
            Home
          </li>
          <li
            className={activePage === 2 ? styles.activeLink : styles.link}
            onClick={() => {
              router.push("/about_us");
              setActivePage(2);
            }}
          >
            About
          </li>
          <li
            className={activePage === 3 ? styles.activeLink : styles.link}
            onClick={() => {
              router.push("/faqs");
              setActivePage(3);
            }}
          >
            FAQs
          </li>
          <li
            className={activePage === 4 ? styles.activeLink : styles.link}
            onClick={() => {
              router.push("/contact");
              setActivePage(4);
            }}
          >
            Contact
          </li>
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
            <MenuIcon className={styles.icon} />
          </div>
          {openMenu && (
            <div className={styles.menuLinks}>
              <li onClick={() => setOpenMenu(false)}>
                <CloseIcon className={styles.icon} />
              </li>
              <li
                onClick={() => {
                  router.push("/");
                  setActivePage(1);
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  router.push("/about_us");
                  setActivePage(2);
                }}
              >
                About
              </li>
              <li
                onClick={() => {
                  router.push("/faqs");
                  setActivePage(3);
                }}
              >
                FAQs
              </li>
              <li
                onClick={() => {
                  router.push("/contact");
                  setActivePage(4);
                }}
              >
                Contact
              </li>
              <li>
                <button
                  className={styles.btn}
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </li>
              <li>
                <button onClick={() => router.push("/register")}>
                  Sign Up
                </button>
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
