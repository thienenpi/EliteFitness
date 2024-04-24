import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: "center",
    marginBottom: SIZES.xxLarge * 2,
  },

  notiText: {
    color: COLORS.secondary500,
    // fontSize: 24,
    // marginTop: 20,
    fontFamily: TEXTS.bodyHeavy.fontFamily,
    fontSize: TEXTS.bodyHeavy.fontSize,
    marginTop: SIZES.large,
  },
});

export default styles;
