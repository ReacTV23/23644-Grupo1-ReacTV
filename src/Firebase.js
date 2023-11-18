// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyCQSGp4K7XYUAIFdJN6XC_AcAkRQnWZU",
  authDomain: "reactv-3ce76.firebaseapp.com",
  projectId: "reactv-3ce76",
  storageBucket: "reactv-3ce76.appspot.com",
  messagingSenderId: "829368396195",
  appId: "1:829368396195:web:8e104009191342cbc2d216"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)