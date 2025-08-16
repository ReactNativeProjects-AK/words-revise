import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useContext } from "react";
import { ScreenContext } from "../store/screen-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import LoadingOverlay from "../components/LoadingOverlay";
import { WordsContext } from "../store/words-context";
import { capitalizeFirstLetter } from "../utils/formatting";
import Notification from "../components/ui/Notification";

export default function RevisionScreen() {
  const { getWord } = useContext(WordsContext);
  const { setScreenDetailsHandler } = useContext(ScreenContext);

  const [wordDetails, setWordDetails] = useState(null);
  const [wordMeaning, setWordMeaning] = useState("");
  const [isAnsweredCorrect, setIsAnsweredCorrect] = useState("");

  const verifyWordDefinition = () => {
    let isAnswerCorrect = false;
    wordDetails?.definitions?.forEach((definition) => {
      if (
        definition.definition
          .toLowerCase()
          .indexOf(wordMeaning.toLowerCase()) >= 0
      ) {
        isAnswerCorrect = true;
      }
    });
    wordDetails?.synonyms?.forEach((synonym) => {
      if (synonym.toLowerCase().indexOf(wordMeaning.toLowerCase()) >= 0) {
        isAnswerCorrect = true;
      }
    });
    wordDetails?.antonyms?.forEach((antonym) => {
      if (antonym.toLowerCase().indexOf(wordMeaning.toLowerCase()) >= 0) {
        isAnswerCorrect = true;
      }
    });

    setIsAnsweredCorrect(isAnswerCorrect === true ? "Correct" : "Incorrect");
  };

  const viewWordDetails = () => {
    setScreenDetailsHandler("Details", { isNew: false, wordDetails });
  };

  useEffect(() => {
    const word = getWord();

    if (!word) {
      setScreenDetailsHandler("Home");
      return;
    }
    setWordDetails(word);
  }, [setWordDetails]);

  const homeHandler = () => {
    setScreenDetailsHandler("Home");
  };

  if (!wordDetails) {
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
        <Header title={capitalizeFirstLetter(wordDetails.word)} />
        <View></View>
      </View>

      <Input
        label="Enter meaning"
        textInputConfig={{
          autoCapitalize: "none",
          autoCorrect: false,
          onChangeText: setWordMeaning,
        }}
      />
      <Button onPress={verifyWordDefinition} style={styles.button}>
        Verify
      </Button>
      {isAnsweredCorrect && (
        <Button onPress={viewWordDetails} style={styles.buttonSecondary}>
          View Details
        </Button>
      )}
      {isAnsweredCorrect === "Correct" && (
        <Notification message="Correct answer!" type="success" />
      )}
      {isAnsweredCorrect === "Incorrect" && (
        <Notification message="Incorrect answer!" type="error" />
      )}
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
    marginVertical: 16,
  },
  buttonSecondary: {
    backgroundColor: COLORS.buttonSecondary,
  },
});
