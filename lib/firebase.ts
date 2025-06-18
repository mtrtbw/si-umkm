import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAgR7eiTm-GNQK-WKSW0lZbEhWdP2GyJvs",
  authDomain: "si-umkm-a0395.firebaseapp.com",
  projectId: "si-umkm-a0395",
  storageBucket: "si-umkm-a0395.firebasestorage.app",
  messagingSenderId: "363063360770",
  appId: "1:363063360770:web:48707e4a497b61643f161b",
  measurementId: "G-D5P93TBYWH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
