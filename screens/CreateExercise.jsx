import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  Platform,
} from "react-native"
import React, { useState } from "react"
import styles from "./styles/createExercise.style"
import { BackBtn, Button } from "../components"
import { Formik } from "formik"
import * as Yup from "yup"
import { COLORS } from "../constants"
import axios from "axios"

const IS_IOS = Platform.OS === "ios"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Name must be at least 1 character")
    .required("Required"),
  numOfSet: Yup.number()
    .min(1, "Number of set must be larger than 1")
    .required("Required"),
  numOfRep: Yup.number()
    .min(1, "Number of rep must be larger than 1")
    .required("Required"),
  affectedMuscles: Yup.string()
    .min(1, "Affected muscles must be at least 1 muscle")
    .required("Required"),
  imageUrl: Yup.string()
    .min(1, "Image URL must be at least 1 character")
    .required("Required"),
  videoUrls: Yup.string()
    .min(1, "Video URLs must be at least 1 character")
    .required("Required"),
  csvPath: Yup.string()
    .min(1, "CSV path must be at least 1 character")
    .required("Required"),
  //   password: Yup.string()
  //     .min(8, "Password must be at least 8 characters")
  //     .required("Required"),
  //   email: Yup.string()
  //     .email("Provide a valid email address")
  //     .required("Required"),
})

const CreateExercise = ({ navigation }) => {
  const [loader, setLoader] = useState(false)

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ])
  }

  const createExercise = async (values) => {
    setLoader(true)
    const data = {
      title: values.name,
      numOfSet: parseInt(values.numOfSet),
      numOfRep: parseInt(values.numOfRep),
      muscles: values.affectedMuscles.split(", "),
      imageUrl: values.imageUrl,
      videoUrls: values.videoUrls.split(", "),
      csvPath: values.csvPath,
    }

    try {
      const endpoint = `http://10.0.177.25:3000/api/exercises`
      const response = await axios.post(endpoint, data)

      if (response.status === 200) {
        setLoader(false)
        console.log("Create exercise successfully")
      } else {
        console.log("status", response.status)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false)
    }

    setLoader(false)
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {IS_IOS ? <View></View> : <View style={{ paddingTop: 60 }}></View>}
        <View style={styles.headerContainer}>
          <BackBtn onPress={() => navigation.goBack()}></BackBtn>
          <Text style={styles.headerText}>Create Exercise</Text>
          <View style={{ width: 30 }}></View>
        </View>
        <View style={styles.bodyContainer}>
          <Formik
            initialValues={{
              name: "",
              numOfSet: "",
              numOfRep: "",
              affectedMuscles: "",
              imageUrl: "",
              videoUrls: "",
              csvPath: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => createExercise(values)}
            initialErrors={{ isValid: false }}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View style={{ backgroundColor: COLORS.primaryBg }}>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Name</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.name || values.name
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter name of exercise"
                      onFocus={() => {
                        setFieldTouched("name")
                      }}
                      onBlur={() => {
                        setFieldTouched("name", "")
                      }}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      autoCapitalize="words"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Number of Set</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.numOfSet || values.numOfSet
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter number of set"
                      onFocus={() => {
                        setFieldTouched("numOfSet")
                      }}
                      onBlur={() => {
                        setFieldTouched("numOfSet", "")
                      }}
                      value={values.numOfSet.toString()}
                      onChangeText={handleChange("numOfSet")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.numOfSet && errors.numOfSet && (
                    <Text style={styles.errorMessage}>{errors.numOfSet}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Number of Rep</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.numOfRep || values.numOfRep
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter number of rep"
                      onFocus={() => {
                        setFieldTouched("numOfRep")
                      }}
                      onBlur={() => {
                        setFieldTouched("numOfRep", "")
                      }}
                      value={values.numOfRep.toString()}
                      onChangeText={handleChange("numOfRep")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.numOfRep && errors.numOfRep && (
                    <Text style={styles.errorMessage}>{errors.numOfRep}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Muscles</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.affectedMuscles || values.affectedMuscles
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter muscles, separate by ','"
                      onFocus={() => {
                        setFieldTouched("affectedMuscles")
                      }}
                      onBlur={() => {
                        setFieldTouched("affectedMuscles", "")
                      }}
                      value={values.affectedMuscles.toString()}
                      onChangeText={handleChange("affectedMuscles")}
                      autoCapitalize="words"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.affectedMuscles && errors.affectedMuscles && (
                    <Text style={styles.errorMessage}>
                      {errors.affectedMuscles}
                    </Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Image URL</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.imageUrl || values.imageUrl
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter image URL"
                      onFocus={() => {
                        setFieldTouched("imageUrl")
                      }}
                      onBlur={() => {
                        setFieldTouched("imageUrl", "")
                      }}
                      value={values.imageUrl}
                      onChangeText={handleChange("imageUrl")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.imageUrl && errors.imageUrl && (
                    <Text style={styles.errorMessage}>{errors.imageUrl}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Video URLs</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.videoUrls || values.videoUrls
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter video URLs, separate by ','"
                      onFocus={() => {
                        setFieldTouched("videoUrls")
                      }}
                      onBlur={() => {
                        setFieldTouched("videoUrls", "")
                      }}
                      value={values.videoUrls}
                      onChangeText={handleChange("videoUrls")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.videoUrls && errors.videoUrls && (
                    <Text style={styles.errorMessage}>{errors.videoUrls}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>CSV Path</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.csvPath || values.csvPath
                        ? COLORS.btn
                        : COLORS.secondary
                    )}
                  >
                    <TextInput
                      placeholder="Enter csv path"
                      onFocus={() => {
                        setFieldTouched("csvPath")
                      }}
                      onBlur={() => {
                        setFieldTouched("csvPath", "")
                      }}
                      value={values.csvPath}
                      onChangeText={handleChange("csvPath")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    ></TextInput>
                  </View>
                  {touched.csvPath && errors.csvPath && (
                    <Text style={styles.errorMessage}>{errors.csvPath}</Text>
                  )}
                </View>

                <Button
                  styles={styles}
                  loader={loader}
                  title={"A D D"}
                  onPress={() => {
                    isValid ? handleSubmit() : invalidForm()
                  }}
                  isValid={isValid}
                ></Button>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default CreateExercise
