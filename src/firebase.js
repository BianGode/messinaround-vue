// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJJEbjYQQWCiDzDRwczPVUlpHgZxAfeCY",
  authDomain: "generic-webshop-c2649.firebaseapp.com",
  projectId: "generic-webshop-c2649",
  storageBucket: "generic-webshop-c2649.appspot.com",
  messagingSenderId: "857376049576",
  appId: "1:857376049576:web:3d1ad60ade36f0e69fb59d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      console.log(userCred.user);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      console.log(userCred);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function getOrders(email) {
  const ordersRef = collection(db, "Users/" + email + '/products-ordered');
  const ordersSnapshot = await getDocs(ordersRef)
}
async function getProductsWithImage() {
  const productsRef = collection(db, "Products");
  const productsSnapshot = await getDocs(productsRef);
  const tempArr = []
  let parserArray = []
  productsSnapshot.forEach((product, inx) => {
    tempArr.push(product.data())
  })

  const storage = getStorage()
  parserArray = [...tempArr]
  tempArr.forEach((product, inx) => {
    const imageRef = ref(storage, 'products/' + product.image)
    getDownloadURL(imageRef).then((url) => {
      parserArray[inx].image = url
    })
  })
  // return an object with the images combined
  return parserArray
}

async function getStorageImages(products) {
  
}

// async function getImagesProducts() {
// // link images to products
// const storage = getStorage()
// const pathRef = ref(storage, 'gs://generic-webshop-c2649.appspot.com/')

// }

export { auth, register, login, getProductsWithImage, getOrders, getStorageImages};
