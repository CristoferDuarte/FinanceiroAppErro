// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // auth importado corretamente

const firebaseConfig = {
  apiKey: "AIzaSyCPuLsX-Md4gLWE4DJ8yJpwF31QuNRaI_Q",
  authDomain: "appfinanceiro-97801.firebaseapp.com",
  databaseURL: "https://appfinanceiro-97801-default-rtdb.firebaseio.com",
  projectId: "appfinanceiro-97801",
  storageBucket: "appfinanceiro-97801.appspot.com",
  messagingSenderId: "449665916545",
  appId: "1:449665916545:web:b16282f7801148ec6e7780",
  measurementId: "G-5CVLRGZ8W4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Serviços
const db = getFirestore(app);
const auth = getAuth(app); // auth configurado corretamente

export { db, auth };