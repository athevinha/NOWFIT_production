import firebase from "firebase";
console.log(process.env)
const REACT_APP_API_KEY='AIzaSyAl_fTde4jLoFiPHgV5CLbOx9WnuioWOPQ';
const REACT_APP_PROJECT_ID='nowfit-52f50';
const REACT_APP_AUTH_DOMAIN='nowfit-52f50.firebaseapp.com';
const REACT_APP_STORAGE_BUCKET='nowfit-52f50.appspot.com';
const REACT_APP_MESSAGING_SENDER_ID='353060827549';
const REACT_APP_APP_ID='1:353060827549:web:d89029e3eb09af81af7f74';
const REACT_APP_MEASUREMENT_ID='G-NWHGKKSEMV';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const db = firebaseApp.firestore();
