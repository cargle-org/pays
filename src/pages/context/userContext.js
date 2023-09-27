import React, { createContext, useEffect, useState } from "react";
import { getProfile } from "../api/profile/getProfile";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    // const [userName, setUserName] = useState(null);

    useEffect(() => {
        (async () => {
          const res = await getProfile();
            if (res) {
                localStorage.setItem('userObj', JSON.stringify(res));
            }
        })();
      }, []);

      useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userInfo = JSON.parse(localStorage?.getItem('userObj'));
            setUserData(userInfo);
          } else {
            console.warn('localStorage is not available.');
          }
       },[])

    return (
        <UserContext.Provider value={{userData}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
