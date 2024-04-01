import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const COLORS = {
  primaryBg: "#FEF9F1",
  secondary: "#38474C", //đen
  secondary500: "#0E7D77",
  text: "#7C7773",
  paragraphBg: "#FF4C01", //orange
  btn: "#F8C06D", //yellow
  exerciseBg: "#FFFFFF",
  accept: "#0E7D77",
  productBg: "rgba(248,192,109,0.1)",
  neutral700: "#ADA9A4",

  //color pallette
  // mac dinh 500
  primary: "#F8C06D",
  primary50: "#FDEDD6",
  primary100: "#FCE8CA",
  primary200: "#FBDEB3",
  primary300: "#FAD49C",
  primary400: "#FAD49C",
  primary600: "#D0A15C",
  primary700: "#A9834A",
  primary800: "#816439",
  primary900: "#594527",

  secondary: "#0E7D77",
  secondary50: "#BCDBD9",
  secondary100: "#A8D0CE",
  secondary200: "#82BBB8",
  secondary300: "#5BA7A3",
  secondary400: "#35928D",
  secondary600: "#0C6964",
  secondary700: "#0A5551",
  secondary800: "#07413E",
  secondary900: "#052D2B",

  warning: "#FF4C01",
  warning50: "#FFBFA4",
  warning100: "#FFA27B",
  warning200: "#FF8552",
  warning300: "#FF692A",
  warning400: "#FF692A",
  warning600: "#D64001",
  warning700: "#AD3401",
  warning800: "#852801",
  warning900: "#5C1B00",

  neutral: "#FEF9F1",
  neutral50: "#FFFDFB",
  neutral100: "#FFFDFA",
  neutral200: "#FEFCF8",
  neutral300: "#FEFBF5",
  neutral400: "#FEFAF3",
  neutral600: "#D5D1CA",
  neutral700: "#ADA9A4",
  neutral800: "#84817D",
  neutral900: "#5B5A57",
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

  // Spacing - 8px base unit
  Xs: 4,
  Sm: 8,
  Md: 16,
  Lg: 24,
  Xl: 32,
  Xxl: 64,
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

const TEXTS = {
  heading1: {
    fontFamily: "rufner",
    fontSize: 48,
  },
  heading2: {
    fontFamily: "rufner",
    fontSize: 32,
  },
  heading3: {
    fontFamily: "rufner",
    fontSize: 32,
  },
  body: {
    fontFamily: "sfProRegular",
    fontSize: 18,
  },
  bodyHeavy: {
    fontFamily: "sfProRegular",
    fontSize: 18,
  },
  bodySmall: {
    fontFamily: "sfProRegular",
    fontSize: 18,
  },
  bodySmallHeavy: {
    fontFamily: "sfProRegular",
    fontSize: 18,
  },
  link: {
    fontFamily: "sfProRegular",
    fontSize: 14,
  },
  linkHeavy: {
    fontFamily: "poppinsBold",
    fontSize: 14,
  },
  linkSmall: {
    fontFamily: "poppinsRegular",
    fontSize: 12,
  },
  buttonSmall: {
    fontFamily: "rufner",
    fontSize: 16,
  },
  buttonLarge: {
    fontFamily: "rufner",
    fontSize: 24,
  },
  caption: {
    fontFamily: "poppinsRegular",
    fontSize: 16,
  },
  captionHeavy: {
    fontFamily: "poppinsBold",
    fontSize: 16,
  },
};

export { TEXTS, COLORS, SIZES, SHADOWS };
