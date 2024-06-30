import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles/generateExercises.style";
import { AppBar, CustomButton, ExerciseColumn } from "../components";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { generateExercise } from "../api";

const typeOptions = [
  { label: "Strength", value: "Strength" },
  { label: "Plyometrics", value: "Plyometrics" },
  { label: "Stretching", value: "Stretching" },
  { label: "Powerlifting", value: "Powerlifting" },
  { label: "Strongman", value: "Strongman" },
  { label: "Cardio", value: "Cardio" },
  { label: "Olympic Weightlifting", value: "Olympic Weightlifting" },
];

const muscleOptions = [
  { label: "Abdominals", value: "Abdominals" },
  { label: "Abductors", value: "Abductors" },
  { label: "Adductors", value: "Adductors" },
  { label: "Biceps", value: "Biceps" },
  { label: "Calves", value: "Calves" },
  { label: "Chest", value: "Chest" },
  { label: "Forearms", value: "Forearms" },
  { label: "Glutes", value: "Glutes" },
  { label: "Hamstrings", value: "Hamstrings" },
  { label: "Lats", value: "Lats" },
  { label: "Lower Back", value: "Lower Back" },
  { label: "Middle Back", value: "Middle Back" },
  { label: "Traps", value: "Traps" },
  { label: "Quadriceps", value: "Quadriceps" },
  { label: "Shoulders", value: "Shoulders" },
  { label: "Triceps", value: "Triceps" },
];

const equipmentOptions = [
  { label: "Barbell", value: "Barbell" },
  { label: "Kettlebells", value: "Kettlebells" },
  { label: "Dumbbell", value: "Dumbbell" },
  { label: "Other", value: "Other" },
  { label: "Cable", value: "Cable" },
  { label: "Machine", value: "Machine" },
  { label: "Body Only", value: "Body Only" },
  { label: "Medicine Ball", value: "Medicine Ball" },
  { label: "Exercise Ball", value: "Exercise Ball" },
  { label: "Foam Roll", value: "Foam Roll" },
  { label: "E-Z Curl Bar", value: "E-Z Curl Bar" },
  { label: "Bands", value: "Bands" },
];

const levelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const GenerateExercises = () => {
  const navigation = useNavigation();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [modalMuscleVisible, setModalMuscleVisible] = useState(false);
  const [modalEquipmentVisible, setModalEquipmentVisible] = useState(false);
  const [modalLevelVisible, setModalLevelVisible] = useState(false);

  const [workout, setWorkout] = useState(null);

  const handleSelect = (selectedItems, setSelectedItems, value) => {
    setSelectedItems((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  const handleGenerateWorkout = async () => {
    // API call to get the workout based on the selected filters
    const criteria = {
      Type: selectedTypes,
      BodyPart: selectedMuscles,
      Equipment: selectedEquipments,
      Level: selectedLevel,
    };

    const data = {
      criteria: criteria,
    };

    try {
      const res = await generateExercise({ data: data });

      if (res.status !== 200) {
        console.log("Error", res.data);
        return;
      }

      let workout = res.data.map((exercise, index) => {
        return {
          _id: index,
          title: exercise.Title,
          desc: exercise.Desc,
          type: exercise.Type.toLowerCase(),
          muscles: [exercise.BodyPart],
          equipment: exercise.Equipment.toLowerCase(),
          level: exercise.Level.toLowerCase(),
          rating: exercise.Rating,
          ratingDesc: exercise.RatingDesc.toLowerCase(),
        };
      });

      console.log("Workout", workout);
      setWorkout(workout);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={"Workout Recommendation"}
        onPressLeftIcon={() => navigation.goBack()}
      />

      <View style={styles.body}>
        <View style={{ width: "100%", padding: 10, height: "100%" }}>
          {/* Type Picker */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setModalTypeVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedTypes.length > 0
                ? selectedTypes.join(", ")
                : "Select Type"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalTypeVisible}
            onRequestClose={() => setModalTypeVisible(false)}
          >
            <View style={styles.modalView}>
              <Text>Select Type</Text>
              <ScrollView>
                {typeOptions.map((option) => (
                  <CheckBox
                    key={option.value}
                    title={option.label}
                    checked={selectedTypes.includes(option.value)}
                    onPress={() =>
                      handleSelect(
                        selectedTypes,
                        setSelectedTypes,
                        option.value
                      )
                    }
                  />
                ))}
              </ScrollView>
              <Button title="Done" onPress={() => setModalTypeVisible(false)} />
            </View>
          </Modal>

          {/* Muscle Picker */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setModalMuscleVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedMuscles.length > 0
                ? selectedMuscles.join(", ")
                : "Select Target Muscle"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalMuscleVisible}
            onRequestClose={() => setModalMuscleVisible(false)}
          >
            <View style={styles.modalView}>
              <Text>Select Target Muscles</Text>

              <ScrollView>
                {muscleOptions.map((option) => (
                  <CheckBox
                    key={option.value}
                    title={option.label}
                    checked={selectedMuscles.includes(option.value)}
                    onPress={() =>
                      handleSelect(
                        selectedMuscles,
                        setSelectedMuscles,
                        option.value
                      )
                    }
                  />
                ))}
              </ScrollView>
              <Button
                title="Done"
                onPress={() => setModalMuscleVisible(false)}
              />
            </View>
          </Modal>

          {/* Equipment Picker */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setModalEquipmentVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedEquipments.length > 0
                ? selectedEquipments.join(", ")
                : "Select Equipment"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalEquipmentVisible}
            onRequestClose={() => setModalEquipmentVisible(false)}
          >
            <View style={styles.modalView}>
              <Text>Select Equipments</Text>

              <ScrollView>
                {equipmentOptions.map((option) => (
                  <CheckBox
                    key={option.value}
                    title={option.label}
                    checked={selectedEquipments.includes(option.value)}
                    onPress={() =>
                      handleSelect(
                        selectedEquipments,
                        setSelectedEquipments,
                        option.value
                      )
                    }
                  />
                ))}
              </ScrollView>
              <Button
                title="Done"
                onPress={() => setModalEquipmentVisible(false)}
              />
            </View>
          </Modal>

          {/* Level Picker */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => setModalLevelVisible(true)}
          >
            <Text style={styles.pickerText}>
              {selectedLevel.length > 0
                ? selectedLevel.join(", ")
                : "Select Level"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalLevelVisible}
            onRequestClose={() => setModalLevelVisible(false)}
          >
            <View style={styles.modalView}>
              <Text>Select Level</Text>

              <ScrollView>
                {levelOptions.map((option) => (
                  <CheckBox
                    key={option.value}
                    title={option.label}
                    checked={selectedLevel.includes(option.value)}
                    onPress={() =>
                      handleSelect(
                        selectedLevel,
                        setSelectedLevel,
                        option.value
                      )
                    }
                  />
                ))}
              </ScrollView>
              <Button
                title="Done"
                onPress={() => setModalLevelVisible(false)}
              />
            </View>
          </Modal>

          <CustomButton
            isValid={true}
            styles={styles}
            label={"Generate workouts"}
            onPress={handleGenerateWorkout}
          />

          {workout !== null && (
            <View style={styles.workout}>
              {workout.length === 0 ? (
                <Text>No workout found</Text>
              ) : (
                <ExerciseColumn items={workout}></ExerciseColumn>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default GenerateExercises;
