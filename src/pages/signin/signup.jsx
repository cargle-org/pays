import React, { useState } from "react";
import styles from "../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import { useAuthContext } from "../api/auth/AuthContext";
import Loading from "../components/loading";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../../assets/logo.svg";

function SignUp() {
  const router = useRouter();

  const [userType, setUserType] = useState("individual");

  // const [companyName, setCompanyName] = useState("");
  // const [companyPhoneNum, setCompanyPhoneNum] = useState("");
  // const [companyEmail, setCompanyEmail] = useState("");
  // const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const { isLoading, setIsLoading } = useAuthContext();
  const { errorMsg, setErrorMsg } = useAuthContext();
  const { handleRegister } = useAuthContext();

  const handleFileInputChange = (event) => {
    setCompanyLogo(event.target.files[0]);
  };

  const registerAccount = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", fullName);
    formData.append("phone", phoneNum);
    formData.append("email", email);
    formData.append("password", password);

    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }

    if (password.length <= 4) {
      setErrorMsg("your password is too short");
    } else if (confirmPassword !== password) {
      setErrorMsg("your password doesn't match");
    } else {
      handleRegister({
        formData,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div
            style={{ paddingTop: 50, paddingBottom: 50 }}
            className={styles.colTwo}
          >
            <div className={styles.logo} onClick={() => router.push("/")}>
              <Logo />
            </div>
            <div className={styles.content}>
              <h2>Sign Up</h2>
              <h6>Welcome to cash my gift</h6>
              {!errorMsg ? (
                <div> </div>
              ) : (
                <p className={styles.error}>{errorMsg}</p>
              )}
              <br />
              <div className={styles.tabs}>
                <div
                  className={
                    userType === "individual" ? styles.activeTab : styles.tab
                  }
                  onClick={(e) => setUserType("individual")}
                >
                  Individual
                </div>
                <div
                  className={
                    userType === "company" ? styles.activeTab : styles.tab
                  }
                  onClick={(e) => setUserType("company")}
                >
                  Company
                </div>
              </div>
              {userType === "individual" && (
                <form onSubmit={registerAccount}>
                  <label>Full Name</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    required
                    aria-describedby="uiddnote"
                    type="text"
                    placeholder="Enter your full name"
                  />
                  {/* <label>Last Name</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-describedby="uiddnote"
                    type="text"
                    placeholder="Enter your last name"
                  /> */}
                  <label>Email</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-describedby="uiddnote"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  <label>Phone Number</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setPhoneNum(e.target.value)}
                    value={phoneNum}
                    required
                    type="number"
                    placeholder="Enter your phone number"
                  />

                  <label>Password</label>
                  <br />
                  <div className={styles.input}>
                    <input
                      autoComplete="on"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      aria-describedby="uiddnote"
                      type={!viewPassword ? "password" : "text"}
                      placeholder="Enter your password"
                    />
                    {viewPassword ? (
                      <AiFillEyeInvisible
                        onClick={() => setViewPassword(false)}
                      />
                    ) : (
                      <AiFillEye onClick={() => setViewPassword(true)} />
                    )}
                  </div>
                  <label>Confirm Password</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    aria-describedby="uiddnote"
                    type="password"
                    placeholder="Re-Enter your password"
                  />
                  <button type="submit">Create Account</button>
                </form>
              )}
              {/*  */}

              {/*  */}
              {/* company account */}
              {userType === "company" && (
                <form onSubmit={registerAccount}>
                  <label>Company’s name</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    required={false}
                    aria-describedby="uiddnote"
                    type="text"
                    placeholder="Enter your company's name"
                    style={{ margin: "8px 0px 20px 0" }}
                  />
                  <label>Company’s logo/image</label>
                  <br />
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    style={{ margin: "8px 0px 20px 0" }}
                  />
                  <label>Company’s Email Address</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={false}
                    aria-describedby="uiddnote"
                    type="text"
                    placeholder="Enter your company's email address"
                    style={{ margin: "8px 0px 20px 0" }}
                  />
                  <label>Company’s Phone Number</label>
                  <br />
                  <input
                    // autoComplete="on"
                    onChange={(e) => setPhoneNum(e.target.value)}
                    value={phoneNum}
                    required={false}
                    // aria-describedby="uiddnote"
                    type="number"
                    placeholder="Enter your company's phoneNumber"
                    style={{ margin: "8px 0px 20px 0" }}
                  />
                  <label>Password</label>
                  <br />
                  <div className={styles.compInput}>
                    <input
                      autoComplete="on"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      aria-describedby="uiddnote"
                      type={!viewPassword ? "password" : "text"}
                      placeholder="Enter your password"
                      style={{ margin: "8px 0px 20px 0" }}
                    />
                    {viewPassword ? (
                      <AiFillEyeInvisible
                        onClick={() => setViewPassword(false)}
                      />
                    ) : (
                      <AiFillEye onClick={() => setViewPassword(true)} />
                    )}
                  </div>
                  <label>Confirm Password</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    aria-describedby="uiddnote"
                    type="password"
                    placeholder="Re-Enter your password"
                    style={{ margin: "8px 0px 20px 0" }}
                  />
                  <button type="submit">Create Account</button>
                </form>
              )}
              <br />
              <p>
                Have an account?{" "}
                <span onClick={() => router.push("/login")}>Log In</span>
              </p>
            </div>
          </div>

          <div className={styles.colOne}>
            <img
              src="https://res?.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
