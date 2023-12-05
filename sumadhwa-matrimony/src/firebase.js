// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCta3OpDrtGc-NxiNao0kP0KRzYb4s4EEU",
    authDomain: "sumadhwa-matrimony-f16df.firebaseapp.com",
    projectId: "sumadhwa-matrimony-f16df",
    storageBucket: "sumadhwa-matrimony-f16df.appspot.com",
    messagingSenderId: "1072845237129",
    appId: "1:1072845237129:web:9bc2f8cb7cff3937df4f58",
    measurementId: "G-E2BLSYN7MH"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB,txtDB};