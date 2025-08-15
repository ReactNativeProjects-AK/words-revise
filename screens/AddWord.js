import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useContext } from "react";
import { ScreenContext } from "../store/screen-context";
import { AuthContext } from "../store/auth-context";
import { addWord, fetchDefinition } from "../utils/fetchData";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import LoadingOverlay from "../components/LoadingOverlay";

export default function AddWordScreen() {
  const { setScreenDetailsHandler } = useContext(ScreenContext);
  const { authToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [word, setWord] = useState("");

  const fetchWordDefinition = async () => {
    try {
      setIsLoading(true);
      await fetchDefinition(word, authToken);
      setScreenDetailsHandler("Details", { word, isNew: true });
    } catch (error) {
      if (error.message === "Word already exists") {
        setError("Word already exists!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

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
      <Button onPress={fetchWordDefinition} style={styles.button}>
        Fetch definition
      </Button>
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle"
            size={32}
            color={COLORS.errorIconAccentRed}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 24,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.errorBannerBackground,
    padding: 16,
    borderRadius: 12,
  },
  errorText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
