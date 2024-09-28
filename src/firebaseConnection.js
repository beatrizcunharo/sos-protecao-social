import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9mM1mlKpgQsQS-h-qJBO0oWpECfqjsCU",
  authDomain: "sos-protecao-social-82293.firebaseapp.com",
  projectId: "sos-protecao-social-82293",
  storageBucket: "sos-protecao-social-82293.appspot.com",
  messagingSenderId: "1003018424418",
  appId: "1:1003018424418:web:da7e979d64f963e394813b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };