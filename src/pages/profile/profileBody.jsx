import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/components/profilepage.module.css";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";
import Logout from "../../assets/logout.svg"
import { removeToken } from "../api/auth/auth";
import { useRouter } from "next/router";
import { editProfile } from "../api/profile/editProfile";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProfileBody() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyImage, setCompanyImage] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNum, setCompanyPhoneNum] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const notify = (message) => toast(message);

  useEffect(() => {
    (async () => {
    setIsLoading(true)
    const res = await getProfile();
      setFullName(`${res.firstName}  ${res.lastName}`);
      setEmail(res.email);
      setPhoneNum(res.phone);
      setCompanyName(res.companyName);
      setCompanyImage(res.companyLogo);
      setCompanyEmail(res.companyEmail);
      setCompanyPhoneNum(res.companyPhone);
        setIsLoading(false)
      })();
  }, []);

  const handleEditProfile = async () => {
      const result = await editProfile({fullName, email, phoneNum})
      if (result) {
        const message = "Changes saved successfully"
        notify(message)
      } else{
        const message = "An error ocurred please try again"
        notify(message)
      }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.profilePage}>
      <ToastContainer/>
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
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              value={fullName}
            />
          </div>
          {/* <div className={styles.input}>
            <label>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </div> */}
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
              // onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              value={companyName}
            />
          </div>
          {/* <div className={styles.input}>
            <label>Company’s logo/image</label>
            <input type="file" />
          </div> */}
          <div className={styles.input}>
            <label>Company’s Email Address</label>
            <input
              // onChange={(e) => setFullName(e.target.value)}
              type="text"
              value={companyEmail}
            />
          </div>
          <div className={styles.input}>
            <label>Company’s Phone Number</label>
            <input
              type="number"
              // onChange={(e) => setCompanyPhoneNum(e.target.value)}
              value={companyPhoneNum}
            />
          </div>
          <div className={styles.button}>
            <button onClick={handleEditProfile}>Save</button>
          </div>
        <li
            onClick={() => {
              removeToken();
              router.push("/login");
            }}
            className={styles.exit}
          >
            <Logout className={styles.icon}/>
            Logout
          </li>
        </div>
      </div>
    </div>
  );
}

export default ProfileBody;
