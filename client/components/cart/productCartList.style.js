import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: "center",
  },

  notiText: {
    color: COLORS.text,
    fontSize: 24,
    marginTop: 20,
  },

  btnContainer: (borderColor) => ({
    height: 40,
    width: "32%",
    borderColor: COLORS.primary,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    gap: 8,
    position: "absolute",
    right: 24,
    bottom: 24,
  }),

  btnLabel: {
    fontFamily: TEXTS.captionHeavy.fontFamily,
    fontSize: TEXTS.caption.fontSize,
    color: COLORS.primary,
  },
});

export default styles;
