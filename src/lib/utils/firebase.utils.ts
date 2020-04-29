import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_DATABASEURL,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_MESSAGESENDERID,
  REACT_APP_FIREBASE_APPID,
  REACT_APP_TASK_URL,
} = publicRuntimeConfig;

const config: any = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASEURL,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: "",
  messagingSenderId: REACT_APP_FIREBASE_MESSAGESENDERID,
  appId: REACT_APP_FIREBASE_APPID
};

export const createUserProfileDocument = 
  async (userAuth: any, additionalData: any) => {
    if(!userAuth) return;

    const userRef = await Axios.get(`${REACT_APP_TASK_URL}/user/auth/${userAuth.uid}`);

    if(!userRef || !userRef.data || userRef.status !== 200) {

      const {
        displayName, 
        email, 
        photoURL,
        uid
      } = userAuth;

      const newUserData = {
        displayName, 
        email, 
        photoURL, 
        uid
      };

      try {
       const newUser = await Axios.post(`${REACT_APP_TASK_URL}/user/`, newUserData);
       return newUser.data();
      } catch (error) {
        console.error(error);
      }
    }

    return userRef.data;
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth: any) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}


export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;