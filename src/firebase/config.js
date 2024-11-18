import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCdc28yFnfSLbO-jh9xlm1HQ4rOPbXQEJQ",
  authDomain: "ti-prog3.firebaseapp.com",
  projectId: "ti-prog3",
  storageBucket: "ti-prog3.firebasestorage.app",
  messagingSenderId: "24323296903",
  appId: "1:24323296903:web:90c57566bb3c630b3af222"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();