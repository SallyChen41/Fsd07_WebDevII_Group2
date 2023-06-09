import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjQT3reGaRWSZekXm9b92swhwy7wKfAtE",
  authDomain: "online-sushi-order.firebaseapp.com",
  projectId: "online-sushi-order",
  storageBucket: "online-sushi-order.appspot.com",
  messagingSenderId: "1071373794197",
  appId: "1:1071373794197:web:fba2c1042fde3c6b1f549c",
  measurementId: "G-D2SKSBET2E",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
