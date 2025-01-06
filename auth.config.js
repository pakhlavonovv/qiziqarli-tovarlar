import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCeISEjNb_WnlwuSvIWCd_dhkETw2zWGn0",
  authDomain: "floxsy-store.firebaseapp.com",
  projectId: "floxsy-store",
  storageBucket: "floxsy-store.firebasestorage.app",
  messagingSenderId: "1014968549060",
  appId: "1:1014968549060:web:484fa85234a87e7b721391",
  measurementId: "G-T3D5V2NCEW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);