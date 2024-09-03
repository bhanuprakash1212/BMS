import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL9welgqhrJSs671P7vzxFStgMULvLW2M",
  authDomain: "sample-128bd.firebaseapp.com",
  databaseURL: "https://sample-128bd-default-rtdb.firebaseio.com",
  projectId: "sample-128bd",
  storageBucket: "sample-128bd.appspot.com",
  messagingSenderId: "794582574250",
  appId: "1:794582574250:web:b9aa55097e6675e4535cd3",
  measurementId: "G-J0BK4VTVB4",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
