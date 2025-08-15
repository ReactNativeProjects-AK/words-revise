import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import * as Speech from "expo-speech";
import { fetchDefinition } from "../utils/fetchData";
import Header from "../components/ui/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { COLORS } from "../utils/colors";
import { capitalizeFirstLetter } from "../utils/formatting";
import Pills from "../components/ui/Pills";
import { Ionicons } from "@expo/vector-icons";
import { ScreenContext } from "../store/screen-context";
import LoadingOverlay from "../components/LoadingOverlay";

export default function DetailsScreen() {
  const [wordDetails, setWordDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { screenDetails } = useContext(ScreenContext);
  const { word, isNew } = screenDetails.params;

  useEffect(() => {
    const fetchWordDetails = async () => {
      try {
        setIsLoading(true);
        // const word = await fetchDefinition(word);
        setWordDetails(word);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchWordDetails();
  }, []);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <LoadingOverlay message="Loading..." />
      </ScreenWrapper>
    );
  }

  const speakWord = () => {
    Speech.speak(wordDetails.word);
  };

  return (
    <ScreenWrapper>
      {isNew && (
        <View style={styles.successContainer}>
          <Ionicons
            name="checkmark-circle"
            size={32}
            color={COLORS.successIconAccentGreen}
          />
          <Text style={styles.successText}>Word added successfully!</Text>
        </View>
      )}
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
      <ScrollView style={styles.scrollView}>
        {wordDetails.definitions.length > 0 && (
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

        {wordDetails.synonyms.length > 0 && (
          <>
            <Text style={[styles.text, styles.subHeader]}>Synonyms</Text>
            <Pills words={wordDetails.synonyms} style={styles.synonymChip} />
          </>
        )}

        {wordDetails.antonyms.length > 0 && (
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
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: COLORS.successBannerBackground,
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  successText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  volumeIcon: {
    color: COLORS.buttonPrimary,
    backgroundColor: COLORS.cardSurfaceDark,
    padding: 8,
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
    width: 20,
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
