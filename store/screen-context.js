import { createContext, useState } from "react";

export const ScreenContext = createContext({
  screenDetails: { screen: "AddWord", params: {} },
  setScreenDetailsHandler: () => {},
});

export function ScreenContextProvider({ children }) {
  const [screenDetails, setScreenDetails] = useState({
    screen: "AddWord",
    params: {},
  });

  const setScreenDetailsHandler = (screen, params = {}) => {
    setScreenDetails({ screen, params });
  };

  return (
    <ScreenContext.Provider value={{ screenDetails, setScreenDetailsHandler }}>
      {children}
    </ScreenContext.Provider>
  );
}
