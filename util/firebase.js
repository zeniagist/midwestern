import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDEpoOKaigWpGX4cPK-OEwA3K7C8xZGRbk",
  authDomain: "nextjsapp-2c1a6.firebaseapp.com",
  projectId: "nextjsapp-2c1a6",
  storageBucket: "nextjsapp-2c1a6.appspot.com",
  messagingSenderId: "181436799777",
  appId: "1:181436799777:web:2b405772abc9b8634bfc60",
  measurementId: "G-T2FJNNHWZN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

export { db };
