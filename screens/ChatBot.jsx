import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles/chatBot.style"
import { GiftedChat } from "react-native-gifted-chat"
import { Feather } from "@expo/vector-icons"
import axios from "axios"
import { OPENAI_API_KEY, IP_ADDRESS } from "@env"

const chatHistory = []
const API_KEY = OPENAI_API_KEY

const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`http://172.0.1.94:3000/api/products`)
      const trainData = response.data
      const title = trainData[0].title
      const description = trainData[0].description
    //   console.log("title", title)
    //   console.log("description", description)
      const userMessage =
        `ProductName,Function\n
        ${title},${description}\n
        Only answer within the information provided.
        Now you are Elite Chatbot, a copy of ChatGPT-3.5, customized by Elite Fitness, let say hello first.
        `
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
          Authorization: `Bearer ${API_KEY}`,
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
      <View style={styles.bubble(props.currentMessage.user._id)}>
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
