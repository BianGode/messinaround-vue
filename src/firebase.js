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
    // console.log(doc.data());
  });
  return IDS.orders;
}
// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function getOrdersProducts(ids) {
  // was working on this function
  let products = [];
  let promises = [];

  // ids.forEach( async (idList, inx) => {
    for(const [inx, idList] of ids.entries()) {
    console.log(idList);
    products.push({
      items: [],
      order: inx,
      date: idList.dateOrdered,
      fullPrice: idList.fullPrice
    });
    // console.log(idList.productsId);
    // idList.productsId.forEach((id, index) => {
    for (let index = 0; index < idList.productsId.length; index++) {
      if (idList.productsId[index].includes("monitor")) {
        const productsRef = collection(db, "Products/electronics/monitors");
        const q = query(
          productsRef,
          where("title", "==", idList.productsId[index])
        );

        const productSnap = await getDocs(q);

            productSnap.forEach((prod) => {
              products[inx].items.push(prod.data());
            })
        // productSnap.forEach((prod) => {
        //   products[inx].items.push(prod.data())
        // })
      } else if (idList.productsId[index].includes("speaker")) {
        const productsRef = collection(db, "Products/electronics/speakers");
        const q = query(
          productsRef,
          where("title", "==", idList.productsId[index])
        );

        const productSnap = await getDocs(q);

          productSnap.forEach((prod) => {
            products[inx].items.push(prod.data());
          })
      }
    }
  };
  // return products
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
    productsId: [...order.productIDs],
    fullPrice: order.fullPrice
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

async function writeReview() {

}

async function getReviews(product) {

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
  writeReview,
};
