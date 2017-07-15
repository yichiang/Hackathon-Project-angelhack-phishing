import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyDyVrCYpd26ICjopoRU2reKTI8hoUvHLbk",
   authDomain: "fishing-d07be.firebaseapp.com",
   databaseURL: "https://fishing-d07be.firebaseio.com",
   projectId: "fishing-d07be",
   storageBucket: "",
   messagingSenderId: "589965824899"
 };


firebase.initializeApp(config);
 export const database = firebase.database();
