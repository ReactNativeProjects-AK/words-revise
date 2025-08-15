import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../utils/colors";

export default function Header({ title, children, style }) {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.backgroundDark,
    padding: 12,
    alignItems: "center",
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 36,
    fontWeight: "bold",
  },
});
