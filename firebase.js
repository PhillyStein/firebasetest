import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC23VjV2kevCjyJDA6RsdDmEyng5--UWsU",
    authDomain: "birdtown-19c4f.firebaseapp.com",
    projectId: "birdtown-19c4f",
    storageBucket: "birdtown-19c4f.firebasestorage.app",
    messagingSenderId: "288486978973",
    appId: "1:288486978973:web:2a7b2552d6f8d292b5ab74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

async function getBirds(db) {
    console.log("1")
    const birdsCol = collection(db, 'birds');
    console.log("2")
    console.log(birdsCol)
    const birdsSnapshot = await getDocs(birdsCol);
    console.log("3")
    const birdList = birdsSnapshot.docs.map(doc => doc.data());
    var birdName = document.getElementById('birdName');
    if (birdName != null) {
        birdName.innerHTML = birdList[0]["bird_name"];
    }
}

var signInButton = document.getElementById("signInButton");
if (signInButton != null) {
    signInButton.onclick = async function() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email != "" && password != "")
        {
            var result = createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "home.html";
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("errorMessageP").innerHTML = "Error " + errorCode + ": " + errorMessage;
            });
        }
    }
}

var signUpButton = document.getElementById("signUpButton");
if (signUpButton != null) {

}

var logOutButton = document.getElementById("logOutButton");
if (logOutButton != null) {
    logOutButton.onclick = async function() {
        signOut(auth).then(()=> {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }
}

auth.onAuthStateChanged(function(user)
    {
        var path = window.location.pathname;
        console.log(path)
        if(user)
        {
           //window.location.href = "home.html";
        }
    })

//getBirds(db)