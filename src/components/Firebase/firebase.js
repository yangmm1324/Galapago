import * as firebase from "firebase";
import "firebase/database";
import "firebase/storage";

let config = {
  apiKey: "AIzaSyBkGmokW285RxesrlEOEGMOpL7DjBMvk_U",
    authDomain: "galapago-d4744.firebaseapp.com",
    databaseURL: "https://galapago-d4744-default-rtdb.firebaseio.com",
    projectId: "galapago-d4744",
    storageBucket: "galapago-d4744.appspot.com",
    messagingSenderId: "508955483910",
    appId: "1:508955483910:web:fca3d82eb50a8892c64887"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firebase.ref(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);
export const storageRef = firebase.storage().ref();
export const firebase_db= firebase.database();
