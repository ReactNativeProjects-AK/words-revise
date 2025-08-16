import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useContext } from "react";
import { ScreenContext } from "../store/screen-context";
import { AuthContext } from "../store/auth-context";
import { fetchDefinition } from "../utils/fetchData";
import { COLORS } from "../utils/colors";
import LoadingOverlay from "../components/LoadingOverlay";
import Notification from "../components/ui/Notification";
import { Ionicons } from "@expo/vector-icons";

export default function AddWordScreen() {
  const { setScreenDetailsHandler } = useContext(ScreenContext);
  const { authToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [word, setWord] = useState("");

  const fetchWordDefinition = async () => {
    try {
      setIsLoading(true);
      const wordDetails = await fetchDefinition(word, authToken);
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

  const homeHandler = () => {
    setScreenDetailsHandler("Home");
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScreenWrapper>
      <View style={styles.headerContainer}>
        <Ionicons
          name="home"
          size={24}
          onPress={homeHandler}
          style={styles.navigationIcon}
        />
        <Header title="Add Word" />
        <View></View>
      </View>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
  },
  navigationIcon: {
    color: COLORS.buttonPrimary,
    padding: 8,
    backgroundColor: COLORS.cardSurfaceDark,
    ...Platform.select({
      ios: { borderRadius: 20 },
    }),
  },
  button: {
    marginVertical: 24,
  },
});
