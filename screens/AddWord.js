import { useState } from "react";
import { StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useContext } from "react";
import { ScreenContext } from "../store/screen-context";
import { AuthContext } from "../store/auth-context";
import { fetchDefinition } from "../utils/fetchData";
import LoadingOverlay from "../components/LoadingOverlay";
import Notification from "../components/ui/Notification";
import HeaderWithHome from "../components/ui/HeaderWithHome";

export default function AddWordScreen() {
  const { setScreenDetailsHandler } = useContext(ScreenContext);
  const { authToken, userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [word, setWord] = useState("");

  const fetchWordDefinition = async () => {
    if (!word.trim().length) {
      setError("Please enter a word!");
      return;
    }

    try {
      setIsLoading(true);
      const wordDetails = await fetchDefinition(word.toLowerCase(), authToken, userId);
      setScreenDetailsHandler("Details", { isNew: true, wordDetails });
    } catch (error) {
      if (error.message === "Word already exists") {
        setError("Word already exists!");
      }
      console.log("fetchWordDefinition error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScreenWrapper>
      <HeaderWithHome headerConfig={{ title: "Add Word" }} />
      <Input
        label="Word"
        value={word}
        textInputConfig={{
          autoCapitalize: "none",
          autoCorrect: false,
          onChangeText: setWord,
        }}
      />
      <Button onPress={fetchWordDefinition} style={styles.button}>
        Fetch definition
      </Button>
      {error && <Notification message={error} type="error" />}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 24,
  },
});
