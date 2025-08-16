import { Platform, StyleSheet, View } from "react-native";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useContext } from "react";
import { ScreenContext } from "../../store/screen-context";

export default function HeaderWithHome({ headerConfig, rightContent }) {
  const { setScreenDetailsHandler } = useContext(ScreenContext);
  const homeHandler = () => {
    setScreenDetailsHandler("Home");
  };
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="home"
        size={24}
        onPress={homeHandler}
        style={styles.navigationIcon}
      />
      <Header title={headerConfig.title} style={headerConfig.style}>
        {headerConfig.headerContent}
      </Header>
      <View>{rightContent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  navigationIcon: {
    color: COLORS.buttonPrimary,
    padding: 8,
    backgroundColor: COLORS.cardSurfaceDark,
    ...Platform.select({
      ios: { borderRadius: 20 },
    }),
  },
});
