import React, { useState } from "react";
import styles from "../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import { useAuthContext } from "../api/auth/AuthContext";

function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {errorMsg, seterrorMsg} = useAuthContext();
  const { handleLogIn } = useAuthContext();

  const loginAccount = (e) => {
    e.preventDefault();
    if (email === "") {
      seterrorMsg("your email field cannot be empty");
    }  else {
      handleLogIn({
        email,
        password,
      });
    }
  }
  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            <div className={styles.content}>
              <form
              onSubmit={loginAccount}
              >
                <h2>Log In</h2>
                <h6>Welcome back to spikk deliveries</h6>
                {!errorMsg ? (<div> </div>): (<p className={styles.error}>{errorMsg}</p>) }
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
                <label>Password</label>
                <br />
                <input
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-describedby="uiddnote"
                  type="password"
                  placeholder="Enter your password"
                />
                <button type="submit">Login</button>
              </form>
              <br />
              <p>
                Don&apos;t have an account?{" "}
                <span onClick={() => router.push("/register")}>Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
