import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import SlideItem from "./slideItem";
import Pagination from "./pagination";
const Slides = [
  {
    id: 1,
    img: require("../../assets/images/banners/banner1.jpg"),
  },
  {
    id: 2,
    img: require("../../assets/images/banners/banner2.jpg"),
  },
  {
    id: 3,
    img: require("../../assets/images/banners/banner3.jpg"),
  },
];
const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  //   const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
  //     // console.log('viewableItems', viewableItems);
  //     setIndex(viewableItems[0].index);
  //   }).current;

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});