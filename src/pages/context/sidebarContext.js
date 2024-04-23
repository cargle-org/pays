import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
export const SidebarContext = createContext({});

const SidebarProvider = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const [activePage, setActivePage] = useState(1)



  return (
    <SidebarContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activePage, 
        setActivePage,
      }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    //   if (!context) throw new Error("useSidebarContext must be used in HouseProvider");
  
    return context;
  };

export default SidebarProvider;
