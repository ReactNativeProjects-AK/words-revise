import AuthForm from "../components/AuthForm";
import { login } from "../utils/auth";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";
import { ScreenContext } from "../store/screen-context";

export default function Login() {
  const authContext = useContext(AuthContext);
  const { setScreenDetailsHandler } = useContext(ScreenContext);

  const loginHandler = async ({ email, password }) => {
    try {
      const data = await login(email, password);
      authContext.login(data.idToken);
      setScreenDetailsHandler("Home");
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        error?.message || "Please try again later."
      );
    }
  };

  return <AuthForm isLogin onAuthenticate={loginHandler} />;
}
