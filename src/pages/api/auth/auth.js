import React from "react";

const checkDomWindow = () => {
  return typeof window !== "undefined";
};

export function userauthstorage({
  email,
  accessToken,
  // user_id
}) {
  localStorage.setItem("email", email);
  localStorage.setItem("token", accessToken);
  // localStorage.setItem('id', user_id);
}

export const getEmail = () => {
  if (checkDomWindow()) {
    return localStorage.getItem("email");
  }
  return null;
};

export const getToken = () => {
  if (checkDomWindow()) {
    return localStorage.getItem("token");
  }
  return null;
};
// export const getUserId =() => {
//     if (checkDomWindow())
//     {return localStorage.getItem('id')}
//     return null
// }

export const removeToken = () => {
  if (checkDomWindow()) localStorage.removeItem("token");
  return null;
};
