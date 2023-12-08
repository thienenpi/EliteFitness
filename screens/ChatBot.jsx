import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import styles from "./styles/chatBot.style"
import { GiftedChat } from "react-native-gifted-chat"
import axios from "axios"

const OPENAI_API_KEY = "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"
// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   baseURL: "https://api.openai.com/v1/chat/completions",
// })

const ChatBot = () => {
  const [messages, setMessages] = useState([])

  const handleSend = async (newMessages = []) => {
    try {
      // Get the user's message
      const userMessage = newMessages[0]

      // Add the user's message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      )
      const messageText = userMessage.text.toLowerCase()
    //   const keywords = [
    //     "exercise",
    //     "product",
    //     "gym",
    //     "muscle",
    //     "exercises",
    //     "products",
    //     "muscles",
    //   ]

    //   if (!keywords.some((keyword) => messageText.includes(keyword))) {
    //     // If the message does not contain any gym-related keywords, respond with a default message
    //     const botMessage = {
    //       _id: new Date().getTime() + 1,
    //       text: "I'm your Elite chatbot, please ask me anything relate to gym and exercise",
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: "Elite chatbot",
    //       },
    //     }
    //     setMessages((previousMessages) =>
    //       GiftedChat.append(previousMessages, botMessage)
    //     )
    //     return
    //   }

      // if the message contains gym-related keywords, fetch a answer from the API and response with it
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: messageText,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      )
    
      const completion = response.data
      console.log(completion)

      const products = completion.choices[0].text.trim()
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: products,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Elite chatbot",
        },
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ELITE CHATBOT</Text>
      </View>
      {/* <View style={styles.convo}></View>
      <View style={styles.inputWrapper}></View> */}
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      ></GiftedChat>
    </View>
  )
}

export default ChatBot
