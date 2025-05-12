import React from "react";
import { useContext } from "react";
import { createContext } from "react";

const SystemContex = createContext();
export const useSystem = () => useContext(SystemContex);

export default ({ children }) => {
  const contextData = {
    t: (val) => val[0].toUpperCase() + val.substr(1).split("_").join(" "),
  };

  return (
    <SystemContex.Provider value={contextData}>
      {children}
    </SystemContex.Provider>
  );
};
