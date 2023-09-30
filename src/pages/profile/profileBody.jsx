import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../styles/components/profilepage.module.css";
import { getProfile } from "../api/profile/getProfile";
import Loading from "../components/loading";
import Logout from "../../assets/logout.svg";
import { removeToken, userauthstorage } from "../api/auth/auth";
import { useRouter } from "next/router";
import { editProfile } from "../api/profile/editProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePassword } from "../api/auth/changePassword";
import PaymentLinks from "./paymentLinks";

function ProfileBody() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tab, setTab] = useState(1);
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [isCompany, setIsCompany] = useState(null);

  const handleFileInputChange = (event) => {
    setCompanyLogo(event.target.files[0]);
  };

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Change password

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const notify = (message) => toast(message);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getProfile();
      setName(res.name);
      setEmail(res.email);
      setPhoneNum(res.phone);
      setCompanyName(res.companyName);
      setCompanyLogo(res.companyLogo);
      setIsCompany(res.isCompany);
      setIsLoading(false);
    })();
  }, []);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phoneNum);
    formData.append("email", email);
    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    } 
    const result = await editProfile({ formData });
    if (result) {
      const res = await getProfile();
      localStorage.setItem('user', JSON.stringify(res));
      const message = "Changes saved successfully";
      notify(message);
    } else {
      const message = "An error ocurred please try again";
      notify(message);
    }
  };

  const handleChangePassword = async () => {
    setErrMsg("")
    if (oldPassword.length === 0) {
      setErrMsg("your old password field cannot be empty");
    } else if (newPassword.length === 0) {
      setErrMsg("your new password field cannot be empty");
    } else if (oldPassword === newPassword) {
      setErrMsg("your old password cannot be the same as new password");
    } else if (newPassword !== confirmPassword) {
      setErrMsg("your password doesn't match");
    } else {
      const result = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (result) {
        setSuccessMsg("Your password have been changed successfully");
      } else {
        setErrMsg("An error ocurred please try again");
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.profilePage}>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.tabs}>
          <div
            onClick={() => {
              setTab(1);
            }}
            className={tab === 1 ? styles.activeTab : styles.tab}
          >
            Edit Profile
          </div>
          <div
            onClick={() => {
              setTab(2);
            }}
            className={tab === 2 ? styles.activeTab : styles.tab}
          >
            Change Password
          </div>
          <div
            onClick={() => {
              setTab(3);
            }}
            className={tab === 3 ? styles.activeTab : styles.tab}
          >
            View Payment Links
          </div>
        </div>
        {tab === 1 && (
          <div>
            <div className={styles.title}>
              <h3>Profile</h3>
            </div>
            <div className={styles.avatar}>
              {isCompany ? 
              <img src={companyLogo} alt="" />
            : 
            <div />}
            </div>
            <div className={styles.details}>
              {isCompany ? (
                <div className={styles.input}>
                  <label>Company’s name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={companyName}
                  />
                </div>
              ) : (
                <div className={styles.input}>
                  <label>Full Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />
                </div>
              )}
              {/* <div className={styles.input}>
            <label>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              value={lastName}
            />
          </div> */}
              <div className={styles.input}>
                {isCompany ? (
                  <label>Company Email Address</label>
                ) : (
                  <label>Email Address</label>
                )}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                />
              </div>
              <div className={styles.input}>
                {isCompany ? (
                  <label>Company Phone Number</label>
                ) : (
                  <label>Phone Number</label>
                )}
                <input
                  onChange={(e) => setPhoneNum(e.target.value)}
                  type="number"
                  value={phoneNum}
                />
              </div>
              {isCompany ? (
                <div className={styles.input}>
                  <label>Company’s logo/image</label>
                  <input type="file" onChange={handleFileInputChange} />
                </div>
              ) : (
                <div></div>
              )}
              {/* <div className={styles.input}>
                <label>Company’s Email Address</label>
                <input
                  onChange={(e) => setName(e.target.value)}
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
              </div> */}
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
                <Logout className={styles.icon} />
                Logout
              </li>
            </div>
          </div>
        )}

        {/* change Password */}
        {tab === 2 && (
          <div className={styles.changePassword}>
            <div className={styles.title}>
              <h3>Change Password</h3>
            </div>
            <div className={styles.details}>
              <br />
              {successMsg ? (
                <p className={styles.message}>{successMsg}</p>
              ) : (
                <div> </div>
              )}
              {errMsg ? <p className={styles.error}>{errMsg}</p> : <div> </div>}
              <br />
              <div className={styles.input}>
                <label>Old Passwrd</label>
                <input
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                    setErrMsg("");
                    setSuccessMsg("");
                  }}
                  type="password"
                  value={oldPassword}
                  placeholder="Enter old password"
                />
              </div>
              <div className={styles.input}>
                <label>New Password</label>
                <input
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrMsg("");
                    setSuccessMsg("");
                  }}
                  type="password"
                  value={newPassword}
                  placeholder="Enter new password"
                />
              </div>
              <div className={styles.input}>
                <label>Confirm New Password</label>
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrMsg("");
                    setSuccessMsg("");
                  }}
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm new password"
                />
              </div>

              <div className={styles.button}>
                <button onClick={handleChangePassword}>Change Password</button>
              </div>
            </div>
          </div>
        )}

          {/* Get all payment links */}
          {tab === 3 && (
            <PaymentLinks />
          )}
        
      </div>
    </div>
  );
}

export default ProfileBody;
