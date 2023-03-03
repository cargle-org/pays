import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import URI_MAP from "../URI/URI_MAP";
import { userauthstorage } from "./auth";

export const AuthContext = createContext({});

const AuthProvider = (props) => {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //   sign up request
  const handleRegister = async ({ formData }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(URI_MAP.cmg.register, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("response", response);
      setIsLoading(false);
      router.push("/accountcreated");
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setErrorMsg(error);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  //   Login Request
  const handleLogIn = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        URI_MAP.cmg.login,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response);
      router.push("/dashboard");
      const accessToken = response.data.data.token;
      // const user_id = response.data.user._id
      userauthstorage({ email, accessToken });

      setIsLoading(false);

    } catch (error) {
      console.log("error", error);
      // if (!error?.response) {
      //   setErrorMsg("No Server Response");
      // } else if (error.response?.status === 409) {
      //   setErrorMsg("User Already Exist");
      // } else if (error.response?.status === 401) {
      //   setErrorMsg("invalid email or password");
      // }
      // else if (error.response?.status === 400) {
      //   setErrorMsg("Pending Account. Please Verify Your Email!");
      // }
      // else {
      //   setErrorMsg("Registration Failed");
      // }
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        // user,
        // setUser,
        handleRegister,
        handleLogIn,
        isLoading,
        setIsLoading,
        errorMsg,
        setErrorMsg,
        success,
        setSuccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  //   if (!context) throw new Error("useAuthContext must be used in HouseProvider");

  return context;
};
export default AuthProvider;
