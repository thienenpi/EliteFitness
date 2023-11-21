import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const COLORS = {
  primaryBg: "#FEF9F1",
  secondary: "#38474C", //đen
  text: "#7C7773",
  paragraphBg: "#FF4C01", //orange
  btn: "#F8C06D", //yellow
  exerciseBg: "#FFFFFF",
  accept: "#0E7D77",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES, SHADOWS };
