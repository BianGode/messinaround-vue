// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJJEbjYQQWCiDzDRwczPVUlpHgZxAfeCY",
  authDomain: "generic-webshop-c2649.firebaseapp.com",
  projectId: "generic-webshop-c2649",
  storageBucket: "generic-webshop-c2649.appspot.com",
  messagingSenderId: "857376049576",
  appId: "1:857376049576:web:3d1ad60ade36f0e69fb59d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCred) => {
    console.log(userCred.user);
  })
  .catch((err) => {
    console.log(err);
  })
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCred) => {
    console.log(userCred);
  }).catch((err) => {
    console.log(err);
  })
}

export {auth, register, login}