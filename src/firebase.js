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
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "vue-router";
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
// initialize storage
const storage = getStorage(app);

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
  // const ordersRef = collection(db, "Users/" + email + "/products-ordered");
  // const ordersSnapshot = await getDocs(ordersRef);
}

async function getProducts() {
  let tempArr = [];
  const productsRef = collection(db, "Products");
  const querySnapshot = await getDocs(productsRef);
  querySnapshot.forEach((product, inx) => {
    tempArr.push(product.data());
  });
  return tempArr;
  // return an object with the images combined
}

async function getSingleProduct() {
  // script to get the current route and get the id based on url
  const router = useRouter();

  const id = router.currentRoute.value.fullPath.split("product/")[1];
  let product = [];
  const col = collection(db, "products")
  const q = query(col, where("id", "==", id));
  const testSnap = await getDocs(q)
  testSnap.forEach((prod) => {
    console.log(prod.data(), prod.id);
    product.push(prod.data());
  });
  return product;

}

// async function getStorageImages(res) {
//   const storage = getStorage();
//   let tempArr = [...res];
//   let returnArr = [];
//   tempArr.forEach((product, inx, arr) => {
//     const imageRef = ref(storage, "products/" + product.image);
//     getDownloadURL(imageRef)
//       .then((resUrl) => {
//         returnArr.push(resUrl);
//         // console.log(arr);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
//   return returnArr;
// }

export { auth, register, login, getProducts, getOrders, getSingleProduct };
