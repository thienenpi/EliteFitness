import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useState } from "react"
import styles from "./styles/chatBot.style"
import { GiftedChat } from "react-native-gifted-chat"
import { Feather } from "@expo/vector-icons"
import axios from "axios"

// You need to paste your own key
const OPENAI_API_KEY = ""
// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   baseURL: "https://api.openai.com/v1/chat/completions",
// })

const initialMessage = {
  _id: new Date().getTime() + 1,
  text: "Hello! how can I assist you?",
  createdAt: new Date(),
  user: {
    _id: 2,
    name: "Elite chatbot",
  },
}

const ChatBot = () => {
  const [messages, setMessages] = useState([initialMessage])
  const [inputText, setInputText] = useState("")

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
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: messageText,
            },
          ],
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

      const content = completion.choices[0].message.content
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: content,
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

  const renderBubble = (props) => {
    return (
      <View style={styles.bubble}>
        <Text>{props.currentMessage.text}</Text>
      </View>
    )
  }

  const renderInputToolbar = (props) => {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputText}
          placeholder="Send a message"
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <TouchableOpacity
          onPress={() => {
            props.onSend({ text: inputText.trim() }, true), setInputText("")
          }}
        >
          <View>
            <Feather name="send" size={24} style={styles.sendIcon}></Feather>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ELITE CHATBOT</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1, avatar: require("../assets/icons/profile/1x.png") }}
        showUserAvatar={true}
        alwaysShowSend={true}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      ></GiftedChat>
      <View style={styles.separator}></View>
    </View>
  )
}

export default ChatBot
