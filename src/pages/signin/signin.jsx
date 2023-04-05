import React, { useState } from "react";
import styles from "../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import { useAuthContext } from "../api/auth/AuthContext";
import Loading from "../components/loading";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const { errorMsg, setErrorMsg } = useAuthContext();
  const { isLoading, setIsLoading } = useAuthContext();
  const { handleLogIn } = useAuthContext();

  const loginAccount = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrorMsg("your email field cannot be empty");
    } else {
      handleLogIn({
        email,
        password,
      });
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={styles.signup}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            <div className={styles.content}>
              <form onSubmit={loginAccount}>
                <h2>Log In</h2>
                <h6>Welcome back to cash my gift</h6>
                {!errorMsg ? (
                  <div> </div>
                ) : (
                  <p className={styles.error}>{errorMsg}</p>
                )}
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
