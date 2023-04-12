import React, { useState } from "react";
import styles from "../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import Header from "../components/header/header";
// import { forgotPassword } from "../api/rider/forgotPassword";

function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  // const { resendEmail } = useAuthContext();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorMsg("your email field cannot be empty");
    } else {
      //  const res = await forgotPassword({
      //     email,
      //   });
      //   setErrorMsg(res)
    }
  };
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
          <div className={styles.logo} onClick={() => router.push("/login")}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681115530/Group_1000000881_edg81o.png"
                alt=""
              />
            </div>
            <div className={styles.content}>
              <form onSubmit={handleForgotPassword}>
                <h2>Forgot password</h2>
                {errorMsg ? (
                  <p className={styles.message}>{errorMsg}</p>
                ) : (
                  <div> </div>
                )}
                <label>Enter your email</label>
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
                <button type="submit">Verify Email</button>
              </form>
              <br />
              <p>
                Have an account?{" "}
                <span onClick={() => router.push("/login")}>Login</span>
              </p>
            </div>
          </div>

          <div className={styles.colOne}>
            <img
              src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
