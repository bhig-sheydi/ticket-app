import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
  const [isGoodToGo, setIsGoodToGo] = useState(false);

  return (
    <AuthContext.Provider value={{ isGoodToGo, setIsGoodToGo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
