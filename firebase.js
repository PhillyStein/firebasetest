import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

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
    document.getElementById('birdName').innerHTML = birdList[0]["bird_name"];
}

var signInButton = document.getElementById("signInButton");

signInButton.onclick = async function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email != "" && password != "")
    {
        var result = signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
}

auth.onAuthStateChanged(function(user)
    {
        if(user)
        {
            window.location.href = "home.html";
        }
    })

getBirds(db)
