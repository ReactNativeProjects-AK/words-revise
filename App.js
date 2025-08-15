import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import SignUpScreen from "./screens/SignUp";
import AddWordScreen from "./screens/AddWord";
import DetailsScreen from "./screens/Details";
import { AuthContext, AuthContextProvider } from "./store/auth-context";
import { ScreenContext, ScreenContextProvider } from "./store/screen-context";
import { getToken } from "./utils/secureToken";
import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";

const pages = {
  Home: HomeScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,
  AddWord: AddWordScreen,
  Details: DetailsScreen,
};

function LoadScreens() {
  const { screenDetails } = useContext(ScreenContext);
  const { isAuthorised, login } = useContext(AuthContext);
  const { screen, params } = screenDetails;
  const [currentComponent, setCurrentComponent] = useState(screen);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await getToken("vocabReviserToken");
      if (storedToken) {
        login(storedToken);
      }
      setIsLoading(false);
    }
    loadToken();
  }, [login, setIsLoading]);

  useEffect(() => {
    const restrictedScreens = ["AddWord"];
    if (restrictedScreens.includes(screen) && !isAuthorised) {
      setCurrentComponent("Login");
    } else {
      setCurrentComponent(screen);
    }
  }, [isAuthorised, screen, setCurrentComponent]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const CurrentComponent =
    pages[currentComponent] || (() => <Text>Page not found</Text>);

  return <CurrentComponent {...params} />;
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <ScreenContextProvider>
          <SafeAreaProvider>
            <LoadScreens />
          </SafeAreaProvider>
        </ScreenContextProvider>
      </AuthContextProvider>
      <StatusBar style="light" />
    </>
  );
}
