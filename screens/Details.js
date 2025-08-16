import { useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import * as Speech from "expo-speech";
import Header from "../components/ui/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { COLORS } from "../utils/colors";
import { capitalizeFirstLetter } from "../utils/formatting";
import Pills from "../components/ui/Pills";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContext } from "../store/screen-context";
import Notification from "../components/ui/Notification";
import LoadingOverlay from "../components/LoadingOverlay";

export default function DetailsScreen() {
  const { setScreenDetailsHandler, screenDetails } = useContext(ScreenContext);
  const { wordDetails, isNew } = screenDetails.params;

  const nextWordHandler = () => {
    setScreenDetailsHandler("Revision");
  };

  const speakWord = () => {
    Speech.speak(wordDetails.word);
  };

  const homeHandler = () => {
    setScreenDetailsHandler("Home");
  };

  if (!wordDetails) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <ScreenWrapper>
      {isNew && (
        <Notification message="Word added successfully!" type="success" />
      )}
      <View style={styles.headerContainer}>
        <Ionicons
          name="home"
          size={24}
          onPress={homeHandler}
          style={styles.navigationIcon}
        />
        <Header
          title={capitalizeFirstLetter(wordDetails.word)}
          style={styles.header}
        >
          <Ionicons
            name="volume-high"
            size={24}
            onPress={speakWord}
            style={styles.volumeIcon}
          />
        </Header>
        <View>
          {!isNew && (
            <Ionicons
              name="arrow-forward"
              size={24}
              onPress={nextWordHandler}
              style={styles.navigationIcon}
            />
          )}
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {wordDetails?.definitions?.length > 0 && (
          <>
            <Text style={[styles.text, styles.subHeader]}>Definitions</Text>
            {wordDetails.definitions.map((def, index) => (
              <View key={index} style={styles.pointContainer}>
                <Text style={styles.pointIndex}>{index + 1}</Text>
                <View style={styles.definitionContainer}>
                  <Text style={[styles.text, styles.point]}>
                    {def.definition}
                  </Text>
                  {def.example && (
                    <Text style={styles.example}>{def.example}</Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}

        {wordDetails?.synonyms?.length > 0 && (
          <>
            <Text style={[styles.text, styles.subHeader]}>Synonyms</Text>
            <Pills words={wordDetails.synonyms} style={styles.synonymChip} />
          </>
        )}

        {wordDetails?.antonyms?.length > 0 && (
          <>
            <Text style={[styles.text, styles.subHeader]}>Antonyms</Text>
            <Pills words={wordDetails.antonyms} style={styles.antonymChip} />
          </>
        )}
      </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  volumeIcon: {
    color: COLORS.buttonPrimary,
    padding: 8,
  },
  navigationIcon: {
    color: COLORS.buttonPrimary,
    padding: 8,
    backgroundColor: COLORS.cardSurfaceDark,
    ...Platform.select({
      ios: { borderRadius: 20 },
    }),
  },
  text: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginVertical: 8,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  definitionContainer: {
    flex: 1,
    marginBottom: 16,
  },
  pointIndex: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "bold",
    marginRight: 16,
    width: 25,
    lineHeight: 24,
  },
  point: {
    lineHeight: 24,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginVertical: 0,
    flex: 1,
  },
  example: {
    lineHeight: 24,
    fontSize: 16,
    color: COLORS.textSecondary,
    marginVertical: 0,
    flex: 1,
    fontStyle: "italic",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 12,
  },
  synonymChip: {
    backgroundColor: COLORS.synonymChipBackground,
  },
  antonymChip: {
    backgroundColor: COLORS.antonymChipBackground,
  },
});
