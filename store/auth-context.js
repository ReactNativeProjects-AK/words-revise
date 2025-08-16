import { createContext, useState } from "react";
import { saveToken, deleteToken } from "../utils/secureToken";

export const AuthContext = createContext({
  isAuthorised: false,
  authToken: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, refreshToken) => {
    setAuthToken(token);
    setUserId(userId);
    saveToken("vocabReviserToken", token);
    saveToken("vocabReviserUserId", userId);
    saveToken("vocabReviserRefreshToken", refreshToken);
  };

  const logout = () => {
    setAuthToken(null);
    deleteToken("vocabReviserToken");
    deleteToken("vocabReviserRefreshToken");
    deleteToken("vocabReviserUserId");
  };

  const value = {
    isAuthorised: !!authToken,
    authToken: authToken,
    userId: userId,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
