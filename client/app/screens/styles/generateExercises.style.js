import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBg,
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pickerText: {
    fontSize: 16,
    padding: 10,
    backgroundColor: COLORS.exerciseBg,
    borderRadius: 5,
    width: "100%",
  },

  modalView: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  option: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 0,
  },

  btnContainer: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    padding: 10,
    borderRadius: SIZES.large,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  }),

  btnLabel: {
    color: COLORS.exerciseBg,
    fontSize: SIZES.large,
  },

  workout: {
    position: "absolute",
    top: SIZES.height * 0.35,
    height: SIZES.height * 0.55,
    alignSelf: "center",
  },
});

export default styles;
