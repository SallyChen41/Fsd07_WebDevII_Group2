// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import admin from "firebase-admin";
// import serviceAccount from ".";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSn4Jld-5rOpMpPelwx0RmrkiSc2bq3Iw",
  authDomain: "react-project-226e6.firebaseapp.com",
  projectId: "react-project-226e6",
  storageBucket: "react-project-226e6.appspot.com",
  messagingSenderId: "813434146655",
  appId: "1:813434146655:web:995daf9bb0d6d44c0bf0ea",
  measurementId: "G-RMDKBVQ19P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const firestore = getFirestore(app);

export { auth, firestore };
