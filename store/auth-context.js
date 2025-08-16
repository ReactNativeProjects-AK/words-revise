import { createContext, useState } from "react";
import { saveToken, deleteToken } from "../utils/secureToken";

export const AuthContext = createContext({
  isAuthorised: false,
  authToken: null,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  const login = (token, refreshToken) => {
    setAuthToken(token);
    saveToken("vocabReviserToken", token);
    saveToken("vocabReviserRefreshToken", refreshToken);
  };

  const logout = () => {
    setAuthToken(null);
    deleteToken("vocabReviserToken");
    deleteToken("vocabReviserRefreshToken");
  };

  const value = {
    isAuthorised: !!authToken,
    authToken: authToken,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
