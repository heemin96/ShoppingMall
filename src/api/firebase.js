import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shoppingmall-73141.firebaseapp.com",
  databaseURL:
    "https://shoppingmall-73141-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoppingmall-73141",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
    })
    .catch((error) => console.error(error));
}
