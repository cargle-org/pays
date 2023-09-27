import React, { createContext, useEffect, useState } from "react";
import { getCategories } from "../api/paymentLink/getCategories";

export const LinkContext = createContext({});

const LinkProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async() => {
            const res = await getCategories();
            if (res.success) {
                setCategories(res.categories);
            }
        })()
    },[])

    return (
        <LinkContext.Provider value={{categories}}>
            {children}
        </LinkContext.Provider>
    );
};

export default LinkProvider;