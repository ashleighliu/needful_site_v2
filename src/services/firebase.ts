import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1wsBytaA_dPxXVIta6_bLZlaQSlYl7SQ",
  authDomain: "needful-6cfc6.firebaseapp.com",
  databaseURL: "https://needful-6cfc6-default-rtdb.firebaseio.com",
  projectId: "needful-6cfc6",
  storageBucket: "needful-6cfc6.appspot.com",
  messagingSenderId: "370296357131",
  appId: "1:370296357131:web:5d76449267af1d099ba20e",
  measurementId: "G-MB3FFBW6GP",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
