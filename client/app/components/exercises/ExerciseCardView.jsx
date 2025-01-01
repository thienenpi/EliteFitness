import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./exerciseCardView.style";
import { useNavigation } from "@react-navigation/native";

const showNotImplementedAlert = () => {
  alert("This feature is not implemented yet.");
};

const ExerciseCardView = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={
        item.csvPath
          ? () => navigation.navigate("Practice", { item })
          : showNotImplementedAlert
      }
    >
      <View style={styles.container}>
        {item.imageUrl !== undefined && (
          <Image
            style={styles.image}
            source={{
              uri: item.imageUrl,
            }}
          ></Image>
        )}
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.setAndRep}>
            {item.numOfSet ? item.numOfSet : 0}
            {"  sets  |  "}
            {item.numOfRep ? item.numOfRep : 0}
            {"  reps\n"}
          </Text>
          {item.desc && (
            <Text style={styles.description} numberOfLines={2}>
              {item.desc}
            </Text>
          )}
        </View>

        <View style={styles.btnColumn}>
          <TouchableOpacity onPress={showNotImplementedAlert}>
            <Image
              style={styles.btn}
              source={require("../../../assets/icons/trash/3x.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={showNotImplementedAlert}>
            <Image
              style={styles.btn}
              source={require("../../../assets/icons/transger/3x.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCardView;
