import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles/chatBot.style"
import { GiftedChat } from "react-native-gifted-chat"
import { Feather } from "@expo/vector-icons"
import axios from "axios"
import { OPENAI_API_KEY } from "@env"

const chatHistory = []

const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    async function fetch() {
      const userMessage =
        "Now you are Elite Chatbot, a copy of ChatGPT-3.5, customized by Elite Fitness"
      const userMessages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }))
      userMessages.push({
        role: "user",
        content: userMessage,
      })

      const completionText = await sendMessage(userMessages)

      const botMessage = {
        _id: new Date().getTime() + 1,
        text: completionText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Elite chatbot",
        },
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      )

      chatHistory.push(["user", userMessage])
      chatHistory.push(["assistant", completionText])
    }

    fetch()
  }, [])

  const sendMessage = async (userMessages) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: userMessages,
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
    const completionText = completion.choices[0].message.content

    return completionText
  }

  const handleSend = async (newMessages = []) => {
    try {
      // Get the user's message
      const userMessage = newMessages[0]

      const userMessages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }))
      userMessages.push({ role: "user", content: userMessage.text })

      // Add the user's message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      )
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
      const completionText = await sendMessage(userMessages)

      const botMessage = {
        _id: new Date().getTime() + 1,
        text: completionText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Elite chatbot",
        },
      }

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      )
      chatHistory.push(["user", userMessage.text])
      chatHistory.push(["assistant", completionText])
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

  const renderAvatar = () => {
    return (
      <Image
        style={styles.botAvatar}
        source={require("../assets/icons/app-icon/3x.png")}
      ></Image>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ELITE CHATBOT</Text>
      </View>
      <GiftedChat
        renderAvatar={renderAvatar}
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
        alwaysShowSend={true}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      ></GiftedChat>
      <View style={styles.separator}></View>
    </View>
  )
}

export default ChatBot
