import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
import { COLORS } from "../utils/colors";
import Card from "../components/ui/Card";
import SupportingText from "../components/ui/SupportingText";

export default function AddWordScreen() {
  const { setScreenDetailsHandler } = useContext(ScreenContext);
  const { authToken, userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customMeanings, setCustomMeanings] = useState([]);

  const [word, setWord] = useState("");

  const fetchWordDefinition = async () => {
    if (!word.trim().length) {
      setError("Please enter a word!");
      return;
    }

    try {
      setIsLoading(true);
      const customWordDefinitions = customMeanings
        .map((meaning) => ({
          ...(meaning.definition.trim() && {
            definition: meaning.definition.trim(),
            ...(meaning.example.trim() && {
              example: meaning.example.trim(),
            }),
          }),
        }))
        .filter((meaning) => meaning?.definition);

      const wordDetails = await fetchDefinition(
        word.toLowerCase(),
        authToken,
        userId,
        customWordDefinitions
      );
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

  const addMeaningHandler = () => {
    setCustomMeanings((prev) => [...prev, { definition: "", example: "" }]);
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScreenWrapper>
      <HeaderWithHome headerConfig={{ title: "Add Word" }} />
      <ScrollView>
        <SupportingText style={styles.supportingText}>
          To enter your own meaning, click on "Add Meaning" button before "Fetch
          Definition" button.
        </SupportingText>
        <Input
          label="Enter Word"
          value={word}
          textInputConfig={{
            autoCapitalize: "none",
            autoCorrect: false,
            onChangeText: setWord,
          }}
        />
        {customMeanings.map((meaning, index) => (
          <Card key={index} style={styles.card}>
            <Input
              label={`Your Meaning ${index + 1} (Optional)`}
              value={meaning.definition}
              textInputConfig={{
                autoCapitalize: "none",
                autoCorrect: false,
                onChangeText: (text) =>
                  setCustomMeanings((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, definition: text } : item
                    )
                  ),
              }}
            />
            <Input
              label={`Your Example ${index + 1} (Optional)`}
              value={meaning.example}
              textInputConfig={{
                autoCapitalize: "none",
                autoCorrect: false,
                onChangeText: (text) =>
                  setCustomMeanings((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, example: text } : item
                    )
                  ),
              }}
            />
          </Card>
        ))}
        <Button onPress={fetchWordDefinition} style={styles.button}>
          Fetch Definition
        </Button>
        <Button onPress={addMeaningHandler} style={styles.buttonSecondary}>
          Add Meaning
        </Button>
        {error && <Notification message={error} type="error" />}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 16,
  },
  buttonSecondary: {
    backgroundColor: COLORS.buttonSecondary,
  },
  card: {
    marginVertical: 8,
  },
  supportingText: {
    marginVertical: 16,
    fontSize: 14,
  },
});
