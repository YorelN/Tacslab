import * as Firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCN3KdsWr4HGOV0hOWRg5uR3B3skm-vZTI",
  authDomain: "taco-929a8.firebase.com",
  databaseURL: "https://taco-929a8.firebaseio.com",
  projectId: "taco-929a8",
  storageBucket: "taco-929a8.appspot.com",
  messagingSenderId: "822376312250"
};

export const firebase = Firebase.initializeApp(config);
export const database = Firebase.database();
export const messagesRef = database.ref("messages");
export const usersRef = database.ref("users");
