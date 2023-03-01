import React from "react";
import styles from "../../styles/components/profilepage.module.css";

function ProfileBody() {
  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Profile</h3>
        </div>
        <div className={styles.avatar}>
          <img src="" alt="" />
        </div>
        <div className={styles.details}>
          <div className={styles.input}>
            <label>First Name</label>
            <input type="text" value={"hello"} />
          </div>
          <div className={styles.input}>
            <label>Last Name</label>
            <input type="text" value={"hello"} />
          </div>
          <div className={styles.input}>
            <label>Email Address</label>
            <input type="text" value={"hello"} />
          </div>
          <div className={styles.input}>
            <label>Phone Number</label>
            <input type="number" value={"09066821545"} />
          </div>
          <div className={styles.input}>
            <label>Company’s name</label>
            <input type="text" value={"hello"} />
          </div>
          <div className={styles.input}>
            <label>Company’s logo/image</label>
            <input type="file" />
          </div>
          <div className={styles.input}>
            <label>Company’s Email Address</label>
            <input type="text" value={"hello"} />
          </div>
          <div className={styles.input}>
            <label>Company’s Phone Number</label>
            <input type="number" value={"09066821545"} />
          </div>
          <div className={styles.button}>

        <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
