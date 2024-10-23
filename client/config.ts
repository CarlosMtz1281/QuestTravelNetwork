import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQal6d9L68_EOGDvj074-pBEYhdwSbzwk",
  authDomain: "questnetwork-3c8b6.firebaseapp.com",
  databaseURL: "https://questnetwork-3c8b6-default-rtdb.firebaseio.com",
  projectId: "questnetwork-3c8b6",
  storageBucket: "questnetwork-3c8b6.appspot.com",
  messagingSenderId: "814245413134",
  appId: "1:814245413134:web:8ab55d92ca9aa856b0975f",
  measurementId: "G-CB90L1VW04"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;