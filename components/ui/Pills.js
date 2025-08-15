import { View, Text, StyleSheet } from "react-native";
import { capitalizeFirstLetter } from "../../utils/formatting";
import { COLORS } from "../../utils/colors";

export default function Pills({ words, style }) {
  return (
    <View style={styles.pillContainer}>
      {words.map((word) => (
        <Text style={[styles.text, styles.pill, style]} key={word}>
          {capitalizeFirstLetter(word)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginVertical: 6,
  },
  pillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    backgroundColor: COLORS.buttonSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
});
