import { StyleSheet } from "react-native";
import { COLORS, SIZES, TEXTS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.primaryBg,
    backgroundColor: COLORS.neutral100,

  },
  

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  
  },

  pickerText: {
    paddingVertical:8,
    paddingHorizontal:12,
    borderBottomWidth:1,
    borderColor: COLORS.neutral600,
    width: "100%",
    fontSize: TEXTS.body.fontSize,
    fontFamily: TEXTS.body.fontFamily,
  },

  modalView: {
    flex: 1,
    marginTop: '60%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: COLORS.neutral900,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },

  option: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent:'center',
    gap: 20,
    fontFamily: TEXTS.body.fontFamily,
    fontSize: TEXTS.body.fontSize
  },

  btnContainer: (backgroundColor) => ({
    marginTop:20,
    backgroundColor: backgroundColor,
    paddingHorizontal:16,
    paddingVertical: 12,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    alignSelf: "center",
  }),

  btnLabel: {
    // color: COLORS.exerciseBg,
    // fontSize: SIZES.large,
    color: COLORS.neutral900,
    fontSize: TEXTS.buttonSmall.fontSize,
    textTransform: "capitalize",
    fontFamily:TEXTS.bodyHeavy.fontFamily

  },

  workout: {
    position: "absolute",
    top: SIZES.height * 0.35,
    height: SIZES.height * 0.55,
    alignSelf: "center",
  },
});

export default styles;
