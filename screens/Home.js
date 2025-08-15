import Header from "../components/ui/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import Card from "../components/ui/Card";
import { Image, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import Button from "../components/ui/Button";
import SupportingText from "../components/ui/SupportingText";
import { useContext } from "react";
import { ScreenContext } from "../store/screen-context";

export default function HomeScreen() {
  const screenContext = useContext(ScreenContext);
  const { setScreenDetailsHandler } = screenContext;
  return (
    <ScreenWrapper>
      <Header title="Vocabulary Reviser" />
      <Card style={styles.card}>
        <SupportingText>Your vocabulary is your power</SupportingText>
        <Image source={require("../assets/home.png")} style={styles.image} />
      </Card>
      <Button
        onPress={() => {
          setScreenDetailsHandler("Details");
        }}
      >
        Start
      </Button>
      <Button
        onPress={() => {
          setScreenDetailsHandler("AddWord");
        }}
        style={styles.button}
      >
        Add Word
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  button: {
    backgroundColor: COLORS.buttonSecondary,
  },
});
