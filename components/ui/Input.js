import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  useAnimatedValue,
} from "react-native";
import { COLORS } from "../../utils/colors";
import { useState, useEffect } from "react";

export default function Input({ label, value, textInputConfig }) {
  const [isFocused, setIsFocused] = useState(false);

  const animatedLabel = useAnimatedValue(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 20,
    zIndex: 1,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 2], // move up when focused
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // shrink font size
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.textSecondary, COLORS.buttonPrimary], // grey → blue
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...textInputConfig}
        value={value}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.borderDivider,
    backgroundColor: COLORS.cardSurfaceDark,
    borderRadius: 12,
    padding: 20,
  },
});
