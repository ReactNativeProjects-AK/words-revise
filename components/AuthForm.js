import { useState } from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "./ScreenWrapper";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Header from "./ui/Header";
import SupportingText from "./ui/SupportingText";
import ButtonBare from "./ui/ButtonBare";

export default function AuthForm({ isLogin, onAuthenticate }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginHandler = () => {
    const email = formState.email.trim();
    const password = formState.password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === formState.confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  };

  const inputChangeHandler = (input, text) => {
    setFormState((prev) => {
      return {
        ...prev,
        [input]: text,
      };
    });
  };

  return (
    <ScreenWrapper>
      <Header title={isLogin ? "Login" : "Sign Up"} />
      <Input
        label="Email"
        value={formState.email}
        textInputConfig={{
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "emailAddress",
          onChangeText: inputChangeHandler.bind(this, "email"),
        }}
      />
      <Input
        label="Password"
        value={formState.password}
        textInputConfig={{
          secureTextEntry: true,
          textContentType: "password",
          onChangeText: inputChangeHandler.bind(this, "password"),
        }}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          value={formState.confirmPassword}
          textInputConfig={{
            secureTextEntry: true,
            textContentType: "password",
            onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
          }}
        />
      )}
      <Button onPress={loginHandler} style={styles.button}>
        {isLogin ? "Log In" : "Sign Up"}
      </Button>
      <SupportingText>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </SupportingText>
      <ButtonBare onPress={() => {}}>
        {isLogin ? "Sign Up" : "Log In"}
      </ButtonBare>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 24,
  },
});
