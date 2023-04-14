import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/signin/signup.module.css";
import { resetPassword } from "../api/auth/resetPassword";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ResetPassword() {
  const router = useRouter();
  const { resetToken } = router.query;

  const [viewPassword, setViewPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password.length <= 4) {
      setErrorMsg("Password is too short");
    } else if (password !== passwordTwo) {
      setErrorMsg("Your password doesn't match");
    }  else {
     const res = await resetPassword({
        password, resetToken, passwordTwo
      });
      if (res) {
        router.push("/passwordreset")
      } else {
        setErrorMsg("An error occurred")
      }
    }
  }
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
          <div className={styles.logo} onClick={() => router.push("/")}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681115530/Group_1000000881_edg81o.png"
                alt=""
              />
            </div>
            <div className={styles.content}>
              <form onSubmit={handleResetPassword}>

              <h2>Reset password</h2>
              {errorMsg ? 
              (<p className={styles.message}>{errorMsg}</p>) 
              : 
              (<div> </div>)
              }
              <label>New password</label>
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
              <label>Confirm password</label>
              <input
                autoComplete="on"
                onChange={(e) => setPasswordTwo(e.target.value)}
                value={passwordTwo}
                required
                aria-describedby="uiddnote"
                type="password"
                placeholder="Confirm new password"
              />
              <button type="submit">Reset password</button>
                </form>
                <br />
                <p>Remember Password? <span onClick={() => router.push("/login")}>Login</span></p>
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

export default ResetPassword;