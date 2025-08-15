import AuthForm from "../components/AuthForm";
import { createUser } from "../utils/auth";
import { Alert } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { ScreenContext } from "../store/screen-context";

export default function SignUp() {
  const authContext = useContext(AuthContext);
  const { setScreenDetailsHandler } = useContext(ScreenContext);

  const signUpHandler = async ({ email, password }) => {
    try {
      const data = await createUser(email, password);
      authContext.login(data.idToken);
      setScreenDetailsHandler("Home");
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        error?.message || "Please try again later."
      );
    }
  };

  return <AuthForm isLogin={false} onAuthenticate={signUpHandler} />;
}
