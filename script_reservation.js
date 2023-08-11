// import firebase from '../node_modules/@firebase/app';
// import database from '../node_modules/@firebase/database';
// import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getDatabase, set, ref, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail, reauthenticateWithCredential, deleteUser, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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

const auth = getAuth();
signInWithEmailAndPassword(auth, 'public@echo-exposition.com', 'DreamAdmin')
  .then((userCredential) => {
    console.log("signed in");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
  });

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://127.0.0.1:5000/res.html',
  // This must be true.
  handleCodeInApp: true,
};

// When date has been input, search in database to see what hours are available and put them in the select box
document.getElementById("selectDate").addEventListener("change", function() {
  var input = this.value; // Take input of Date (HTML)
    var sel = document.getElementById("selectHeure");
    var i, L = sel.options.length - 1;  // Remove all hours from select
     for(let i = L; i >= 0; i--) {
        sel.remove(i);
     }
    const dbRef = ref(getDatabase()); // Search database
    get(child(dbRef, 'horaire/'+input)).then((snapshot) => { // GO to horaire/Jour
      snapshot.forEach((snapchild) => { // Cycle between each children
        var nbIn = parseInt((JSON.stringify(snapchild.val())).substr(10,1));
        // console.log(nbIn + parseInt(nb));
        if ( nbIn + parseInt(document.getElementById("selectNombre").value) <= 5 ){  // If + get nombre
          const opt = document.createElement("option");
          opt.value = snapchild.key;
          opt.text = snapchild.key;
          document.getElementById("selectHeure").add(opt,null); // Add in select
        }
      });
    });
});

//WRITE
function writeUserData(id, email, hour, day, nombre) { // Function to write in databse inputs
  const db = getDatabase();
  set(ref(db, 'users/' + id + '/'), {
    heure: hour,
    date: day,
    mail: email,
    visiteurs: nombre
  });
    var name = document.getElementById("usr_nom").value;
    var surname = document.getElementById("usr_prenom").value;
    set(ref(db, 'users/' + id + '/clients/' + name + "-" + surname + '/'), {
      Nom: name,
      Prenom: surname
    });
  get(ref(db, 'horaire/'+day+'/'+hour+'/nombre/')).then((snapshot) => {
    set(ref(db, 'horaire/' + day + '/' + hour), {
      nombre: parseInt(parseInt(snapshot.val()) + parseInt(nombre))
    });
  });
  // writeUserData(user.uid, document.getElementById("inputNom"+i).value,document.getElementById("inputPrenom"+i).value,
  // iemail,iheure,idate);
  // console.log(document.getElementById("inputNom"+1).value)
}

// Check if everything is ok before calling write function
document.getElementById("buttonsubmit").onclick = function(){ 
  const iemail = document.getElementById("usr_email");
  const iconfemail = document.getElementById("usr_confemail");
  const iheure = document.getElementById("selectHeure");
  const idate = document.getElementById("selectDate");
  const iNombre = document.getElementById("selectNombre");
  const iprenom = document.getElementById("usr_prenom");
  const inom = document.getElementById("usr_nom");
  const checkb = document.getElementById("CGUCheckTxtID");

  iemail.style.borderColor = 'black';
  iconfemail.style.borderColor = 'black';
  iNombre.style.borderColor = 'black';
  idate.style.borderColor = 'black';
  iheure.style.borderColor = 'black';
  iprenom.style.borderColor = 'black';
  inom.style.borderColor = 'black';
  checkb.style.color = 'black';
  
  var x = 0;
  if (iemail.value.search('@') == -1 || iemail.value.indexOf('.') == -1 ){ //Check if email has @ and .
    iemail.style.borderColor = 'red';
    x = x + 1;
  }if (iemail.value != iconfemail.value) {
    iconfemail.style.borderColor = 'red';
    x = x + 1;
  }if (iNombre.value > 5 || iNombre.value < 1){  // Check if number of visitor is between 1 and 5
    iNombre.style.borderColor = 'red';
    x = x + 1;
  }if (idate.value != '2023-02-03' && idate.value != '2023-02-04' && idate.value != '2023-02-05'){ // Check if date input is ok
    idate.style.borderColor = 'red';
    x = x + 1;
  }if (iheure.value == ''){  // Check if hour is ok
    iheure.style.borderColor = 'red';
    x = x + 1;
  }if (iprenom.value == ''){
    x = x + 1;
    iprenom.style.borderColor = 'red';
  }if (inom.value == ''){
    x = x + 1;
    inom.style.borderColor = 'red';
  }if (document.getElementById("CGUCheck").checked == false){
    x = x + 1;
    console.log("false");
    checkb.style.color = 'red';
  }; // !!!!!!!!!!!!!!!!!!!!!! Attention : pas de verification si mail existe !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (x == 0){  // Each check add x++ if incorrect. If x == 0 (so if there is no issue) call write function
    createUserWithEmailAndPassword(auth, iemail.value, 'password').then((userCredential) => {
      const user = userCredential.user;
      writeUserData(user.uid,iemail.value,iheure.value,idate.value, iNombre.value);
    });
    document.getElementById("reservation_infosID").style.visibility="visible";
    document.getElementById("reservation_infoTextID").innerHTML="Merci pour votre réservation !";
    document.getElementById("reservation_buttonAnnulerConfirmer").style.visibility="hidden";
    document.getElementById("reservation_mailAnnuler").style.visibility="hidden";
  };
}

document.getElementById("buttonannuler").onclick = function(){ 
  document.getElementById("reservation_infosID").style.visibility="visible";
  document.getElementById("reservation_infoTextID").innerHTML="Rentrez l'adresse mail avec laquelle vous vous êtes inscrit";
  document.getElementById("reservation_buttonAnnulerConfirmer").style.visibility="visible";
  document.getElementById("reservation_mailAnnuler").style.visibility="visible";
  if (window.matchMedia("(max-width: 580px)").matches) {
    document.getElementById("reservation_buttonAnnulerRetourA").style.visibility="visible";
  }
}

document.getElementById("reservation_buttonAnnulerConfirmer").onclick = function(){ 
  const email = document.getElementById("reservation_mailAnnuler").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, 'password')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      deleteUser(user).then(() => {
        // User deleted.
      });
      var id = user.uid;
      const dbRef = ref(getDatabase()); // Search database
      get(child(dbRef, 'users/'+id+'/clients/')).then((snapnb) => {
        get(child(dbRef, 'users/'+id+'/date/')).then((snapdate) => {
          get(child(dbRef, 'users/'+id+'/heure/')).then((snapheure) => {
            get(child(dbRef, 'horaire/'+snapdate.val()+'/'+snapheure.val()+'/nombre')).then((snapshotnbr) => {
              set(child(dbRef, 'users/'+id+'/deleted'), {
                deleted : 'yes'
              });
              set(child(dbRef, 'horaire/'+snapdate.val()+'/'+snapheure.val()+'/'), {
                nombre: snapshotnbr.val() - snapnb.size
              });
            });
          });
        });
      });
      document.getElementById("reservation_buttonAnnulerConfirmer").style.visibility="hidden";
      document.getElementById("reservation_mailAnnuler").style.visibility="hidden";
      document.getElementById("reservation_infoTextID").innerHTML="La reservation effectuée avec l'adresse mail "+email+' a bien été supprimé';
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode == 'auth/invalid-email' ||errorCode == 'auth/user-not-found' ){
        var res_txt = document.getElementById("reservation_infoTextID");
        res_txt.innerHTML="\n Il n'y a pas de reservation associée à cette adresse mail";
      }
    });
}

document.getElementById("selectDate").style.backgroundColor = "#eee";
document.getElementById("selectNombre").onchange = function(){
  document.getElementById("selectDate").disabled = false;
  document.getElementById("selectDate").style.backgroundColor = "white";
};

document.getElementById("selectHeure").style.backgroundColor = "#eee";
document.getElementById("selectDate").onchange = function(){
  document.getElementById("selectHeure").disabled = false;
  document.getElementById("selectHeure").style.backgroundColor = "white";
};

document.getElementById("buttonNavette").onclick = function(){ 
  document.getElementById("reservation_NavetteID").style.visibility="visible";
  if (window.matchMedia("(max-width: 580px)").matches) {
    document.getElementById("reservation_buttonAnnulerRetourN").style.visibility="visible";
  }
  document.getElementById("selectHeureRetour").style.backgroundColor = "#eee";
  document.getElementById("selectHeureAller").style.backgroundColor = "#eee";
}

document.getElementById("reservation_buttonNavetteConfirmer").onclick = function(){
  const email = document.getElementById("reservation_mailNavette").value;
  const auth = getAuth();
  const DAller = document.getElementById("selectDateAller").value;
  const DRetour = document.getElementById("selectDateRetour").value;
  const HAller = document.getElementById("selectHeureAller").value;
  const HRetour = document.getElementById("selectHeureRetour").value;
  signInWithEmailAndPassword(auth, email, 'password')
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      var id = user.uid;
      const dbRef = ref(getDatabase()); // Search database
      set(child(dbRef, 'users/'+id+'/navette/'), {
        DateAller: DAller,
        DateRetour: DRetour,
        HeureAller: HAller,
        HeureRetour:HRetour
      });
      window.alert("La navette a été réservée");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode == 'auth/invalid-email' ||errorCode == 'auth/user-not-found' ){
        var res_txt = document.getElementById("reservation_NavetteTextID");
        res_txt.innerHTML="\n Il n'y a pas de reservation associée à cette adresse mail";
      }
    });
}

const AllerVendredi = ['12h00','12h40','13h20','14h00','14h40','15h20','16h00','16h40','17h20'];
const AllerSamedi = ['10h00','10h40','11h20','12h00','12h40','13h20','14h40','15h20','16h00','16h40','17h20'];
const AllerDimanche = ['10h00','10h40','11h20','12h00','12h40','13h20','14h40','15h20','16h00','16h40'];

const RetourVendredi = ['12h20','13h00','13h40','14h20','15h00','15h40','16h20','17h00','17h40'];
const RetourSamedi = ['10h20','11h00','11h40','12h20','13h00','13h40','14h20','15h00','15h40','16h20','17h00','17h40'];
const RetourDimanche = ['10h20','11h00','11h40','12h20','13h00','13h40','14h20','15h00','15h40','16h20','17h00'];

document.getElementById("selectDateAller").onchange = function(){
  const SH = document.getElementById("selectHeureAller");
  if (document.getElementById("selectDateAller").value == '2023-02-03'){
    changeHeureSelect(AllerVendredi,SH);
  }
  else if (document.getElementById("selectDateAller").value == '2023-02-04'){
    changeHeureSelect(AllerSamedi,SH);
  }
  else if (document.getElementById("selectDateAller").value == '2023-02-05'){
    changeHeureSelect(AllerDimanche,SH);
  }
  document.getElementById("selectHeureAller").disabled = false;
  document.getElementById("selectHeureAller").style.backgroundColor = "white";
};

document.getElementById("selectDateRetour").onchange = function(){
  const SH = document.getElementById("selectHeureRetour");
  if (document.getElementById("selectDateRetour").value == '2023-02-03'){
    changeHeureSelect(RetourVendredi,SH);
  }
  else if (document.getElementById("selectDateRetour").value == '2023-02-04'){
    changeHeureSelect(RetourSamedi,SH);
  }
  else if (document.getElementById("selectDateRetour").value == '2023-02-05'){
    changeHeureSelect(RetourDimanche,SH);
  }
  document.getElementById("selectHeureRetour").disabled = false;
  document.getElementById("selectHeureRetour").style.backgroundColor = "white";
};

function changeHeureSelect(AllerRetour,SH){
  for(let j=SH.options.length; j>=0;j--){SH.remove(j)}
  for (let i=0; i < AllerRetour.length;i++){ 
    var opt = document.createElement('option');
    opt.value, opt.innerHTML = AllerRetour[i], AllerRetour[i];
    SH.appendChild(opt);
  };
}

document.getElementById("reservation_buttonAnnulerRetourN").onclick = function(){
  document.getElementById("reservation_NavetteID").style.visibility="hidden";
  console.log("lol");
  if (window.matchMedia("(max-width: 580px)").matches) {
    document.getElementById("reservation_buttonAnnulerRetourN").style.visibility="hidden";
  }
}

document.getElementById("reservation_buttonAnnulerRetourA").onclick = function(){
  document.getElementById("reservation_infosID").style.visibility="hidden";
  document.getElementById("reservation_buttonAnnulerConfirmer").style.visibility="hidden";
  if (window.matchMedia("(max-width: 580px)").matches) {
    document.getElementById("reservation_buttonAnnulerRetourA").style.visibility="hidden";
  }
}
