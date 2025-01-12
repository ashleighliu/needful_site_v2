import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlNnlOMbIpqU56ajlh7uXoo7Gxs5jXRAM",
  authDomain: "needful-6cfc6.firebaseapp.com",
  databaseURL: "https://needful-6cfc6-default-rtdb.firebaseio.com",
  projectId: "needful-6cfc6",
  storageBucket: "needful-6cfc6.appspot.com",
  messagingSenderId: "370296357131",
  appId: "1:370296357131:web:5d76449267af1d099ba20e",
  measurementId: "G-MB3FFBW6GP",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
