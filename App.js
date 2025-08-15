import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Login from "./screens/Login";
import HomeScreen from "./screens/Home";
import SignUp from "./screens/SignUp";
import AddWordScreen from "./screens/AddWord";
import DetailsScreen from "./screens/Details";

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        {/* <HomeScreen /> */}
        {/* <Login /> */}
        {/* <SignUp /> */}
        {/* <AddWordScreen /> */}
        <DetailsScreen />
      </SafeAreaProvider>
      <StatusBar style="light" />
    </>
  );
}
