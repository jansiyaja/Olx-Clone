// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPxcY_cieYXCdys4fVMaI0KlbQuVDSDCA",
  authDomain: "olx-clone-93b34.firebaseapp.com",
  projectId: "olx-clone-93b34",
  storageBucket: "olx-clone-93b34.appspot.com",
  messagingSenderId: "969042188626",
  appId: "1:969042188626:web:bc57d4aa327c70f797428b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);