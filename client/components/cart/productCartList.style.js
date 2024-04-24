import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: "center",
    marginBottom: SIZES.xxLarge * 2,
  },

  notiText: {
    color: COLORS.text,
    fontSize: 24,
    marginTop: 20,
  },
});

export default styles;
