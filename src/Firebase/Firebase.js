// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_API_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.REACT_APP_API_PROJECT_ID_FIREBASE,
    storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDERID_FIREBASE,
    appId: process.env.REACT_APP_API_ID_FIREBASE,
};

// Inicializa Firebase
//console.log("Firebase Config:", firebaseConfig)
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
