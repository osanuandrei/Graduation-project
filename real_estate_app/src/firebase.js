// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY9O_yuteLDPZlPUeQAfp5DF1xSL6gAl4",
  authDomain: "real-estate-app-55db9.firebaseapp.com",
  projectId: "real-estate-app-55db9",
  storageBucket: "real-estate-app-55db9.appspot.com",
  messagingSenderId: "281216131499",
  appId: "1:281216131499:web:382b53ae8b1cd06a51f2ee",
  measurementId: "G-3GT6J7YPNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();