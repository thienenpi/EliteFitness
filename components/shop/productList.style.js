import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 250,
    marginHorizontal: 40,
    textAlign: "center",
    // width: "100%",
  },
  headerTxt: {
    fontFamily: "poppinsMedium",
    fontSize: 16,
    color: COLORS.paragraphBg,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default styles;
