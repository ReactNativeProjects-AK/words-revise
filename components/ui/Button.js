import { StyleSheet, Pressable, Text, View } from "react-native";
import { COLORS } from "../../utils/colors";

export default function Button({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
    >
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.buttonPrimary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});
