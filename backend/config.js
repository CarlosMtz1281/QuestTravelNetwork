const firebase=require('firebase');
firebaseConfig = {
  apiKey: "AIzaSyCQal6d9L68_EOGDvj074-pBEYhdwSbzwk",
  authDomain: "questnetwork-3c8b6.firebaseapp.com",
  projectId: "questnetwork-3c8b6",
  storageBucket: "questnetwork-3c8b6.appspot.com",
  messagingSenderId: "814245413134",
  appId: "1:814245413134:web:bac74a53c790bf04b0975f",
  measurementId: "G-D3XW1VQBNX"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const users = db.collection('users');
module.exports = { users };