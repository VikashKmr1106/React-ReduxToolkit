
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD1AzrhRpU1LyKQUOEEdbKCxiztki25XHs",
  authDomain: "crud-256ab.firebaseapp.com",
  projectId: "crud-256ab",
  storageBucket: "crud-256ab.appspot.com",
  messagingSenderId: "181572829747",
  appId: "1:181572829747:web:e12d1b63212483252b5946",
  measurementId: "G-DKMYRSLT71"
};

const firebaseConfigApp = initializeApp(firebaseConfig);
export default firebaseConfigApp;
// const analytics = getAnalytics(app);