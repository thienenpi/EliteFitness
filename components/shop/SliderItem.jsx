import { Image, StyleSheet, Text, View, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants'

const { width, height } = SIZES

const SliderItem = ({ item }) => {
  const translateYImage = new Animated.Value(40)

  //   Animated.timing(translateYImage, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //     easing: Easing.bounce,
  //   }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage
              }
            ]
          }
        ]}
      />
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
  container: {
    width,
    height
  },
  image: {
    flex: 0.2,
    width: '100%'
  }
})
