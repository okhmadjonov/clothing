import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDyrCuwhwgRMhPsPUpgoGSa6A-3dU2QOfg",
  authDomain: "clothing-db-a9cc9.firebaseapp.com",
  databaseURL: "https://clothing-db-a9cc9.firebaseio.com",
  projectId: "clothing-db-a9cc9",
  storageBucket: "clothing-db-a9cc9.appspot.com",
  messagingSenderId: "643094747899",
  appId: "1:643094747899:web:747f453abd801ade28ee5e",
  measurementId: "G-1T33719BC5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
