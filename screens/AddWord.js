import { useState } from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function AddWordScreen() {
  const [word, setWord] = useState("");

  const fetchDefinition = () => {
    console.log(word);
  };

  return (
    <ScreenWrapper>
      <Header title="Add Word" />
      <Input
        label="Word"
        value={word}
        textInputConfig={{
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCorrect: false,
          textContentType: "emailAddress",
          onChangeText: setWord,
        }}
      />
      <Button onPress={fetchDefinition} style={styles.button}>
        Fetch definition
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 24,
  },
});
