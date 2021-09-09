import firebase from "./firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDEpoOKaigWpGX4cPK-OEwA3K7C8xZGRbk",
  authDomain: "nextjsapp-2c1a6.firebaseapp.com",
  projectId: "nextjsapp-2c1a6",
  storageBucket: "nextjsapp-2c1a6.appspot.com",
  messagingSenderId: "181436799777",
  appId: "1:181436799777:web:2b405772abc9b8634bfc60",
  measurementId: "G-T2FJNNHWZN",
});

var db = firebaseApp.firestore();

export { db };
