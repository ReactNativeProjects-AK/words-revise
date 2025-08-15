import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardSurfaceDark,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
});
