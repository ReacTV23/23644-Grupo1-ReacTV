import * as firebase from 'firebase/app'
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCXqAYL1wCSl7j_4gaOMLzyciodpXOauLA",
    authDomain: "reactvdb.firebaseapp.com",
    projectId: "reactvdb",
    storageBucket: "reactvdb.appspot.com",
    messagingSenderId: "314221567908",
    appId: "1:314221567908:web:e01002a272ce9ae4782b31"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const projectFirestore = firebase.firestore();