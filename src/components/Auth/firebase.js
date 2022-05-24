// Import the functions you need from the SDKs you need
import * as  firebase from "firebase";
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ0qWwEeHFRAp0Reyrvy9bKGeaLYyrbis",
  authDomain: "numberphone-65ab4.firebaseapp.com",
  projectId: "numberphone-65ab4",
  storageBucket: "numberphone-65ab4.appspot.com",
  messagingSenderId: "32352174502",
  appId: "1:32352174502:web:81a556c50c801bfc8bcf67",
  measurementId: "G-6JV2QB5KWY"
};

// Initialize Firebase
// let app;
// if(firebase.apps.length ===0){
//     app=firebase.initializeApp(firebaseConfig)
// }
// else
//     app=firebase.app()

// const auth =firebase.auth();
// auth.languageCode = 'it';

initializeApp(firebaseConfig);