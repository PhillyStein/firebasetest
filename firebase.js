import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { collection, doc, getDoc, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

const firebaseConfig = {
    //replace the following info with your own Firebase info
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

async function getShopItems(db) {
    // this gets the "food_shop" document from firestore
    const foodShopDoc = doc(db, "shops", "food_shop");
    const foodShopSnap = await getDoc(foodShopDoc);
    var shopItems = document.getElementById('shopItems');
    // if there's a shopItems id on the page, do the following
    if (shopItems != null && foodShopSnap.exists()) {
        // this gets the data from the "food_shop" document
        var foodShop = foodShopSnap.data();
        // this gets all the keys in the "food_shop" map (name, price, etc...)
        var foodShopKeys = Object.keys(foodShop);
        // this iterates through the items in "food_shop" and displays them on the page
        for(let i = 0; i < foodShopKeys.length; i++) {
            let key = foodShopKeys[i]
            shopItems.innerHTML += foodShop[key]["name"] + ": " + foodShop[key]["price"] + "<br>";
        }
    }
}

var signInButton = document.getElementById("signInButton");
if (signInButton != null) {
    signInButton.onclick = async function() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email != "" && password != "")
        {
            // Signs in the user and redirects them to the 'home' page.
            var result = signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "home.html";
                console.log(auth);
                console.log(user);
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
    signUpButton.onclick = async function() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email != "" && password != "")
        {
            // Signs up the user and redirects them to the 'home' page. Probably change this to a welcome page or something.
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

var logOutButton = document.getElementById("logOutButton");
if (logOutButton != null) {
    // Logs the user out and redirects them to the 'index' page.
    logOutButton.onclick = async function() {
        signOut(auth).then(()=> {
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    }
}

var debugButton = document.getElementById("debugButton");
if (debugButton != null) {
    debugButton.onclick = function() {
        console.log(user);
        console.log(auth);
    }
}

// this just loads the shop function
getShopItems(db)