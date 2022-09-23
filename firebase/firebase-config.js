// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: 'AIzaSyDkN6hQVesVlR4Rz221haWr2P-gOlPOLE4',
  authDomain: 'minhaj-keeper.firebaseapp.com',
  projectId: 'minhaj-keeper',
  storageBucket: 'minhaj-keeper.appspot.com',
  messagingSenderId: '401422494315',
  appId: '1:401422494315:web:a47f358c77c50119ae9f2e',
  measurementId: 'G-BE7CKTFLZL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);
