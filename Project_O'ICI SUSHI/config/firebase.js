// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(app);

// Utility function to check if the user has admin role
export const isAdmin = async (user) => {
  try {
    const firestore = getFirestore();
    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log(userData.role);
      return userData.role === "admin";
    }
    return false;
  } catch (error) {
    console.log("Error checking user role:", error.message);
    return false;
  }
};

export { auth, firestore, storage };
