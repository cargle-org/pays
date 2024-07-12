import React from "react";

export const checkDomWindow = () => {
  return typeof window !== "undefined";
};

export function userauthstorage({ email, accessToken, user_id, user }) {
  localStorage.setItem("email", email);
  localStorage.setItem("token", accessToken);
  localStorage.setItem("id", user_id);
  localStorage.setItem("user", JSON.stringify(user));
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
export const getUserId = () => {
  if (checkDomWindow()) {
    return localStorage.getItem("id");
  }
  return null;
};
// export const getUserDetails = () => {
//   if (checkDomWindow())
//   {return JSON.parse(localStorage.getItem('user'))}
//   return null
// }

export const getUserDetails = () => {
  if (checkDomWindow()) {
    const user = localStorage.getItem("user");
    if (user) {
      // return JSON.parse(user);
      return user;
    }
  }
  return null;
};

export const removeToken = () => {
  if (checkDomWindow()) localStorage.clear();
  return null;
};
