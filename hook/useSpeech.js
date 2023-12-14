import * as Speech from "expo-speech"

const useSpeech = async (textToSpeak) => {
  let voices = await Speech.getAvailableVoicesAsync()
  const options = {
    voices: "com.apple.ttsbundle.Ellen-compact",
  }
  Speech.speak(textToSpeak, options)
}

export default useSpeech
