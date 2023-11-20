// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const apiKey = process.env.REACT_APP_API_KEY;
// const authDomain = process.env.REACT_APP_API_AUTH_DOMAIN;
// const projectId = process.env.REACT_APP_API_PROJECT_ID;
// const storageBucket = process.env.REACT_APP_API_STORAGE_BUCKET;
// const messagingSenderId = process.env.REACT_APP_API_MESSAGING_SENDERID;
// const appId = process.env.REACT_APP_API_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_PROJECT_ID ,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_API_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_API_ID,
};

// Initialize Firebase
// console.log("Firebase Config:", firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)