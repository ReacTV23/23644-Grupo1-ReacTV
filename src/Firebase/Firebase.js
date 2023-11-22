// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_API_PROJECT_ID,
    storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_API_ID,
};

// Inicializa Firebase
console.log("Firebase Config:", firebaseConfig)
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
