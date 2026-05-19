import { initializeApp }
from "firebase/app";

import { getFirestore }
from "firebase/firestore";

import { getAuth }
from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyBafz5E0162h1EF5fbM7OllYssMxPFN5YQ",

  authDomain:
    "smartnotesai-8f880.firebaseapp.com",

  projectId:
    "smartnotesai-8f880",

  storageBucket:
    "smartnotesai-8f880.firebasestorage.app",

  messagingSenderId:
    "366875429274",

  appId:
    "1:366875429274:web:05ed328464ee788d721223",
};

const app =
  initializeApp(
    firebaseConfig
  );

export const db =
  getFirestore(app);

export const auth =
  getAuth(app);

export default app;