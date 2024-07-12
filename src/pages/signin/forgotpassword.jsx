import React, { useState } from "react";
import styles from "../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import { forgotPassword } from "../api/auth/forgotPassword";
import Logo from "../../assets/logo.svg";

function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  // const { resendEmail } = useAuthContext();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorMsg("your email field cannot be empty");
    } else {
      console.log("running forgot password");
      const res = await forgotPassword({
        email,
      });
      if (res?.success) {
        console.log(res?.message);
        setErrorMsg("");
        setResponseMessage(
          "Please refer to your mail to complete this process"
        );
      } else {
        console.log("error");
        setResponseMessage("");
        setErrorMsg(res?.message.toString());
      }
    }
  };
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            <div className={styles.logo} onClick={() => router.push("/")}>
              <Logo />
            </div>
            <div className={styles.content}>
              <form onSubmit={handleForgotPassword}>
                <h2>Forgot password</h2>
                {responseMessage ? (
                  <p className={styles.message}>
                    A reset link has been sent to you email address.{" "}
                    {responseMessage}
                  </p>
                ) : (
                  <div> </div>
                )}
                {errorMsg ? (
                  <p className={styles.error}>{errorMsg}</p>
                ) : (
                  <div> </div>
                )}
                <br />
                {!responseMessage ? (
                  <div>
                    <label>Enter your email</label>
                    <br />
                    <input
                      autoComplete="on"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg("");
                      }}
                      value={email}
                      required
                      aria-describedby="uiddnote"
                      type="email"
                      placeholder="Enter your email address"
                    />
                    <button type="submit">Verify Email</button>
                  </div>
                ) : (
                  <div></div>
                )}
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
              src="https://res?.cloudinary.com/dmixz7eur/image/upload/v1681288615/chike/pexels-ketut-subiyanto-4559951_y7tzis.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
