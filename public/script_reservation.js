// import firebase from '../node_modules/@firebase/app';
// import database from '../node_modules/@firebase/database';
// import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getDatabase, set, ref, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';

const firebaseConfig = {

  apiKey: "AIzaSyDR-L-vWijjLytwMuqwkZmH6c7YutEVefY",

  authDomain: "echo-exposition-website.firebaseapp.com",

  projectId: "echo-exposition-website",

  storageBucket: "echo-exposition-website.appspot.com",

  messagingSenderId: "307603750279",

  appId: "1:307603750279:web:4d4783a048dacc28d26722",

  databaseURL: "https://echo-exposition-website-default-rtdb.europe-west1.firebasedatabase.app",

};


const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function fonctiontest () {
  var inputtest = document.getElementById("input").value;
  writeUserData("userIDTEST","nameTEST",inputtest,"imageUrlTEST");
  console.log(inputtest);
}

document.getElementById("buttonsubmit").onclick = function(){fonctiontest()};

// writeUserData("userIDTEST","nameTEST","emailTEST","imageUrlTEST");

const dbRef = ref(getDatabase());
get(child(dbRef, 'users/userIDTEST/email')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    document.getElementById("test").textContent=snapshot.val();
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});