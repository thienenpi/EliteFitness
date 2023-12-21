import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import BottomTabNavigation from './navigation/BottomTabNavigation'
import { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CreateExercise, Practice } from './screens'

// Create Stack Navigator
const Stack = createNativeStackNavigator()

export default function App() {
  // Load fonts, change if you want
  const [fontsLoaded] = useFonts({
    // Poppins
    poppinsRegular: require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    poppinsLight: require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    poppinsBold: require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    poppinsMedium: require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    poppinsExtrabold: require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    poppinsSemibold: require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),

    // Rufner
    rufner: require('./assets/fonts/Rufner/Rufner.otf'),

    // SF Pro
    sfProBlackItalic: require('./assets/fonts/SFPro/SFPRODISPLAYBLACKITALIC.otf'),
    sfProBold: require('./assets/fonts/SFPro/SFPRODISPLAYBOLD.otf'),
    sfProHeavyItalic: require('./assets/fonts/SFPro/SFPRODISPLAYHEAVYITALIC.otf'),
    sfProLightItalic: require('./assets/fonts/SFPro/SFPRODISPLAYLIGHTITALIC.otf'),
    sfProMedium: require('./assets/fonts/SFPro/SFPRODISPLAYMEDIUM.otf'),
    sfProRegular: require('./assets/fonts/SFPro/SFPRODISPLAYREGULAR.otf'),
    sfProSemiBoldItalic: require('./assets/fonts/SFPro/SFPRODISPLAYSEMIBOLDITALIC.otf'),
    sfProThinItalic: require('./assets/fonts/SFPro/SFPRODISPLAYTHINITALIC.otf'),
    sfProUltraLightItalic: require('./assets/fonts/SFPro/SFPRODISPLAYULTRALIGHTITALIC.otf')
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

        <Stack.Screen
          name="Practice"
          component={Practice}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="CreateExercise"
          component={CreateExercise}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
