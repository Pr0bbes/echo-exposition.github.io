// import firebase from '../node_modules/@firebase/app';
// import database from '../node_modules/@firebase/database';
// import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getDatabase, set, ref, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


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

// PASSWORD
var email = 'echo-exposition@gmail.com';
var password = window.prompt("MDP");

const auth = getAuth(app);
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    if (user.uid == 'pnNUn0ryu9Pio8gyizybyMhSacF2'){  
      readAllUsers();
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
//---
function readAllUsers(){
  var tableRow = document.getElementById("usersTable");
  var navetteRow = document.getElementById("navetteTable");
  const dbRef = ref(getDatabase()); // Search database
  get(child(dbRef, 'users/')).then((snapshot) => { // GO to users/
    snapshot.forEach((snapid) => {
          get(child(dbRef, 'users/'+snapid.key+'/clients/')).then((snapclients)=>{
            // console.log(snapclients.size);
            snapclients.forEach((snapCL) => {
              var row = tableRow.insertRow(-1);
              var cell = [];
              cell[1] = row.insertCell();
              cell[2] = row.insertCell();
              cell[3] = row.insertCell();
              cell[4] = row.insertCell();
              cell[5] = row.insertCell();
              cell[8] = row.insertCell();
              cell[6] = row.insertCell();
              cell[6].innerHTML = snapid.key;
              cell[7] = row.insertCell();
              var Nrow = navetteRow.insertRow(-1);
              var Ncell = [];
              Ncell[1] = Nrow.insertCell();
              Ncell[2] = Nrow.insertCell();
              Ncell[3] = Nrow.insertCell();
              Ncell[4] = Nrow.insertCell();
              Ncell[5] = Nrow.insertCell();
              Ncell[6] = Nrow.insertCell();
              snapCL.forEach((snapCL) => {
                if (snapCL.key == 'Nom') {cell[1].innerHTML = snapCL.val();}
                else if (snapCL.key == 'Prenom') {cell[2].innerHTML = snapCL.val();}
              });
              get(child(dbRef, 'users/'+snapid.key+'/deleted/deleted/')).then((snapinfo)=>{
                if (snapinfo.val() != 'yes'){
              
                get(child(dbRef, 'users/'+snapid.key+'/navette/')).then((snapinfo)=>{
                  snapinfo.forEach((snapinfo)=>{
                    if (snapinfo.key == 'DateAller') {Ncell[2].innerHTML = snapinfo.val();}
                    else if (snapinfo.key == 'DateRetour') {Ncell[4].innerHTML = snapinfo.val();}
                    else if (snapinfo.key == 'HeureAller') {Ncell[3].innerHTML = snapinfo.val();}
                    else if (snapinfo.key == 'HeureRetour') {Ncell[5].innerHTML = snapinfo.val();}
                  });
                })
              }
              });
              get(child(dbRef, 'users/'+snapid.key+'/')).then((snapinfo)=>{
                snapinfo.forEach((snapinfo)=>{
                  if (snapinfo.key == 'date'){cell[4].innerHTML = snapinfo.val();}
                  else if (snapinfo.key == 'heure'){cell[5].innerHTML = snapinfo.val();}
                  else if (snapinfo.key == 'mail'){cell[3].innerHTML = snapinfo.val();Ncell[1].innerHTML = snapinfo.val();}
                  else if (snapinfo.key == 'visiteurs'){cell[8].innerHTML = snapinfo.val();Ncell[6].innerHTML = snapinfo.val();}
                })
              });
              get(child(dbRef, 'users/'+snapid.key+'/deleted/deleted')).then((snapdel)=>{
                if (snapdel.val() == 'yes'){cell[7].innerHTML = 'yes';}
                else {cell[7].innerHTML = 'no';}
              });
            });
          });
    });
  });
}

document.getElementById("btnRemove").onclick = function(){
  var id = window.prompt("Entrez l'ID du compte à retirer");
  const dbRef = ref(getDatabase()); // Search database
  get(child(dbRef, 'users/'+id+'/clients/')).then((snapnb) => {
    get(child(dbRef, 'users/'+id+'/date/')).then((snapdate) => {
      get(child(dbRef, 'users/'+id+'/heure/')).then((snapheure) => {
        get(child(dbRef, 'horaire/'+snapdate.val()+'/'+snapheure.val()+'/nombre')).then((snapshotnbr) => {
          set(child(dbRef, 'users/'+id+'/'), {
            // deleted : 'yes'
          });
          set(child(dbRef, 'horaire/'+snapdate.val()+'/'+snapheure.val()+'/'), {
            nombre: snapshotnbr.val() - snapnb.size
          });
        });
      });
    });
  });

}

    // get(child(dbRef, 'users/'+id+'/date/')).then((snapshotd) => {
    //   get(child(dbRef, 'horaire/'+snapshotd.val()+'/'+snapshoth.val()+'/nombre')).then((snapshotnbr) => {
    //     // console.log('horaire/'+rmvdate+'/'+rmvheure+'/');
    //     console.log(snapshotd.val());
    //     set(child(dbRef, 'horaire/'+snapshotd.val()+'/'+snapshoth.val()+'/'), {
    //       nombre: snapshotnbr.val() - 1
    //     });
    //     set(child(dbRef, 'users/'+client+'/'), {
    //       // deleted : 'yes'
    //     });
    //   });
    // });