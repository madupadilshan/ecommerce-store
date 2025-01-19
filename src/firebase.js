import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdyeJr1rcEcxdbsvnRTzYVhPGxulyuC_M",
  authDomain: "ecommerce-store-2fb85.firebaseapp.com",
  projectId: "ecommerce-store-2fb85",
  storageBucket: "ecommerce-store-2fb85.appspot.com",
  messagingSenderId: "817887665780",
  appId: "1:817887665780:web:5fcd05355d9bd84ad7fb21",
  measurementId: "G-TFTJZMY3E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Export
export const db = getFirestore(app);
export const auth = getAuth(app);
