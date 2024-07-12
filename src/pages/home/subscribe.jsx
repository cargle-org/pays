import React from "react";
import styles from "../../styles/Home.module.css";

function Subscribe() {
  return (
    <div className={styles.subscribe}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Get the latest updates!</h2>
          <h6>
            From newsletters and blogs to special offers, be a part of the
            conversation. Receive the latest updates in your inbox.
          </h6>
          <form>
            <input type="text" placeholder="Enter  Email address" />
            <button>Subscribe</button>
          </form>
          <img
            src="https://res?.cloudinary.com/dmixz7eur/image/upload/v1683798079/chike/Group_8_v3ntku.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
