import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/components/profilepage.module.css";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";

function ProfileBody() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNum, setCompanyPhoneNum] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
    setIsLoading(true)
    const res = await getProfile();
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setEmail(res.email);
      setPhoneNum(res.phone);
      setCompanyName(res.companyName);
      setCompanyImage(res.companyLogo);
      setCompanyEmail(res.companyEmail);
      setCompanyPhoneNum(res.companyPhone);
        setIsLoading(false)
      })();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Profile</h3>
        </div>
        <div className={styles.avatar}>
          <img src={companyImage} alt="" />
        </div>
        <div className={styles.details}>
          <div className={styles.input}>
            <label>First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={firstName}
            />
          </div>
          <div className={styles.input}>
            <label>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </div>
          <div className={styles.input}>
            <label>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
            />
          </div>
          <div className={styles.input}>
            <label>Phone Number</label>
            <input
              onChange={(e) => setPhoneNum(e.target.value)}
              type="number"
              value={phoneNum}
            />
          </div>
          <div className={styles.input}>
            <label>Company’s name</label>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              value={companyName}
            />
          </div>
          <div className={styles.input}>
            <label>Company’s logo/image</label>
            <input type="file" />
          </div>
          <div className={styles.input}>
            <label>Company’s Email Address</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              value={companyEmail}
            />
          </div>
          <div className={styles.input}>
            <label>Company’s Phone Number</label>
            <input
              type="number"
              onChange={(e) => setCompanyPhoneNum(e.target.value)}
              value={companyPhoneNum}
            />
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
