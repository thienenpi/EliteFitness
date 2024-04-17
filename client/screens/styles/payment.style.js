import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    btnContainer: (backgroundColor)=>({
        backgroundColor: backgroundColor,
        borderRadius: 12,
        width: SIZES.width - SIZES.xxLarge * 5,
        height: SIZES.xxLarge,
        alignItems: "center",
        justifyContent: "center",
    })
})

export default styles