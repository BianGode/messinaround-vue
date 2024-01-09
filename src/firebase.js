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
  setDoc,
  doc,
  or,
} from "firebase/firestore";
import { useRouter } from "vue-router";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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

// functions getting and setting orders
// get all the orders for this person
async function getOrders() {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const ordersRef = collection(
    db,
    "Users/" + auth.currentUser.email + "/orders/" + year + "/orders"
  );
  const ordersSnapshot = await getDocs(ordersRef);
  let IDS = {
    orders: [],
  };
  ordersSnapshot.forEach((doc) => {
    IDS.orders.push(doc.data());
    // getDoc()
  });
  return IDS.orders;
}

async function getOrdersProducts(ids) {
  // was working on this function
  let products = [];
  ids.forEach((idList, inx) => {
    products.push({
      items: [],
      order: inx,
      date: idList.dateOrdered
    })
    // console.log(idList.productsId);
    idList.productsId.forEach(async (id, index) => {
      if (id.includes("monitor")) {
        const productsRef = collection(db, "Products/electronics/monitors");
        const q = query(productsRef, where('title', '==', id))

        const productSnap = await getDocs(q)
        
        productSnap.forEach((prod) => {
          console.log(prod.data())
          products[inx].items.push(prod.data())
          console.log(products[inx].items);
        })
      } else if (id.includes('speaker')) {
        const productsRef = collection(db, "Products/electronics/speakers");
        const q = query(productsRef, where('title', '==', id))
        
        const productSnap = await getDocs(q);
        
        productSnap.forEach((prod) => {
          console.log(prod.data());
          products[inx].items.push(prod.data);
        })
      }
    });
  });
  // console.log(products);
  return products;
}

// add an order to the firestore db
// This looks messy but its very simple
// get the year month and day and assign them to one variable
// add the order in the user/<useremail>/orders/2024/orders collection with unique id
async function addOrder(order, userEmail) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthNum = dateNow.getMonth();
  const day = dateNow.getDay();
  let month = months[monthNum];
  month = month.slice(0, 3);
  const date = day.toString() + "-" + month + "-" + year.toString();

  const orderData = {
    dateOrdered: date,
    productsId: [...order],
  };

  let orderRefName = uuidv4();
  if (orderRefName & (2 == 0)) {
    console.log("is even number of segments");
  } else {
    orderRefName.slice(0, orderRefName.length - 2);
  }
  await setDoc(
    doc(
      db,
      "Users/" + auth.currentUser.email + "/orders/" + year + "/orders",
      orderRefName
    ),
    orderData
  );
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

async function getSpeakers() {
  let tempArr = [];
  const productsRef = collection(db, "Products/electronics/speakers");
  const querySnapshot = await getDocs(productsRef);
  querySnapshot.forEach((product, inx) => {
    tempArr.push(product.data());
    console.log(product.data());
  });
  return tempArr;
}

async function getMonitors() {
  let tempArr = [];
  const productsRef = collection(db, "Products/electronics/monitors");
  const querySnapshot = await getDocs(productsRef);
  querySnapshot.forEach((product, inx) => {
    tempArr.push(product.data());
    console.log(product.data());
  });
  return tempArr;
}

async function getSingleProduct() {
  // script to get the current route and get the id based on url
  const router = useRouter();

  const title = router.currentRoute.value.fullPath.split("product/")[1];
  let product = [];
  const col = collection(db, "Products");
  const q = query(col, where("title", "==", title));
  const testSnap = await getDocs(q);
  testSnap.forEach((prod, inx) => {
    console.log(prod.data(), prod.id);
    product.push(prod.data());
  });
  return product;
}


export {
  auth,
  register,
  login,
  getProducts,
  getSpeakers,
  getMonitors,
  getOrders,
  getSingleProduct,
  addOrder,
  getOrdersProducts,
};
