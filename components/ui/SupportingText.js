import { Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";

export default function SupportingText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
