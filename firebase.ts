// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABL0BBeIhWc5BYtuQPV1THhtlqLUHu5Us",
  authDomain: "chatgpt-nextjs13.firebaseapp.com",
  projectId: "chatgpt-nextjs13",
  storageBucket: "chatgpt-nextjs13.appspot.com",
  messagingSenderId: "437083396099",
  appId: "1:437083396099:web:38c85f429c94d5408b9636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }