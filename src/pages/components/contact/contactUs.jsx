import React, { useState } from "react";
import styles from "../../../styles/signin/signup.module.css";
import { useRouter } from "next/router";
import Header from "../header/header";

function ContactUs() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  // const { resendEmail } = useAuthContext();

  const handleForgotPassword = async (e) => {
    // e.preventDefault();
    // if (email === "") {
    //   setErrorMsg("your email field cannot be empty");
    // } else {
    //   const res = await forgotPassword({
    //     email,
    //   });
    //   if (res?.success) {
    //     setErrorMsg("");
    //     setResponseMessage(
    //       "Please refer to your mail to complete this process"
    //     );
    //   } else {
    //     setResponseMessage("");
    //     setErrorMsg(res?.message.toString());
    //   }
    // }
  };
  return (
    <div className={styles.signup}>
      <Header />
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colTwo}>
            {/* <div className={styles.logo} onClick={() => router.push("/")}>
              <img
                src="https://res.cloudinary.com/dmixz7eur/image/upload/v1681115530/Group_1000000881_edg81o.png"
                alt=""
              />
            </div> */}
            <div className={styles.content}>
              <form onSubmit={handleForgotPassword}>
                <h2>Contact Us</h2>
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
                {/* <br /> */}
                {!responseMessage ? (
                  <div>
                  <label>Full name</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => {setEmail(e.target.value); setErrorMsg("")}}
                    value={email}
                    required
                    aria-describedby="uiddnote"
                    type="email"
                    placeholder="Enter your full name"
                  />
                  <label>Email address</label>
                  <br />
                  <input
                    autoComplete="on"
                    onChange={(e) => {setEmail(e.target.value); setErrorMsg("")}}
                    value={email}
                    required
                    aria-describedby="uiddnote"
                    type="email"
                    placeholder="Enter your email address"
                  />
                  <label>Enter your message</label>
                  <br />
                  <textarea style={{width: "100%",}}
                    autoComplete="on"
                    onChange={(e) => {setEmail(e.target.value); setErrorMsg("")}}
                    value={email}
                    required
                    aria-describedby="uiddnote"
                    type="email"
                    placeholder="Enter your email address"
                  />
                    <button type="submit">Send Message</button>
                  </div>
                ) : (
                  <div></div>
                )}
              </form>              
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

export default ContactUs;
