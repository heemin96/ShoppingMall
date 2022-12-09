import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, ref, set, get } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyArn22AGt4fSswo-TDZtiyBg8aUK1l0FR8",
  authDomain: "shoppingmall-73141.firebaseapp.com",
  databaseURL:
    "https://shoppingmall-73141-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppingmall-73141",
  storageBucket: "shoppingmall-73141.appspot.com",
  messagingSenderId: "412401958382",
  appId: "1:412401958382:web:a672fb74e6a79a5044e2ff",
  measurementId: "G-D0G9EZ7TCK",
};

// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch(console.error);
}

//
export async function logout() {
  return signOut(auth).then(() => null);
}

// 새로고침해도 로그아웃 안풀림.
// 어드민 uid 확인.
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}
