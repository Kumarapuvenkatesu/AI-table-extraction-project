import React,{createContext,useState} from "react";
export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [widthValue, setWidthValue] = useState("118");

  return (
    <DataContext.Provider value={{widthValue, setWidthValue}}>
      {children}
    </DataContext.Provider>
  );
};