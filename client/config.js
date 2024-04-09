import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL038UjJqjBlEM5YE1AMvZfcrjn8waNWU",
  authDomain: "elitefitness-419003.firebaseapp.com",
  projectId: "elitefitness-419003",
  storageBucket: "elitefitness-419003.appspot.com",
  messagingSenderId: "636989636710",
  appId: "1:636989636710:web:cf410c7b41e27eaa296da7",
  measurementId: "G-79FB7VK91M",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
