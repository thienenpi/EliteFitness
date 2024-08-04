import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  workoutContainer: {
    flex: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  menuContainer: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  loader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  btnContainer: (backgroundColor) => ({
    padding: SIZES.small,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.medium,
  }),

  btnLabel: {
    fontFamily: "sfProBlackItalic",
    color: "black",
    fontSize: SIZES.medium,
    marginHorizontal: SIZES.large,
  },
});

export default styles;
