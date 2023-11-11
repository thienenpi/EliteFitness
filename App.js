import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts } from "expo-font"
import BottomTabNavigation from "./navigation/BottomTabNavigation"
import { useCallback } from "react"
import { NavigationContainer } from "@react-navigation/native"

// Create Stack Navigator
const Stack = createNativeStackNavigator()

export default function App() {
  // Load fonts, change if you want
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  })

  // Unused code, but do not remove or cmd
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  // Return null if can not load fonts
  if (!fontsLoaded) {
    return null
  }

  // Create stack screen for each .jsx file in 'screens' folder
  // Search, Home, Profile is included in BottomTabNavigation
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        ></Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  )
}
