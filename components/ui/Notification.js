import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Notification({ message, type }) {
  return (
    <View
      style={[
        styles.resultContainer,
        type === "error" ? styles.errorContainer : styles.successContainer,
      ]}
    >
      <Ionicons
        name={type === "error" ? "alert-circle" : "checkmark-circle"}
        size={32}
        color={
          type === "error"
            ? COLORS.errorIconAccentRed
            : COLORS.successIconAccentGreen
        }
      />
      <Text style={styles.resultText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    marginVertical: 16,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBannerBackground,
  },
  successContainer: {
    backgroundColor: COLORS.successBannerBackground,
  },
  resultText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
