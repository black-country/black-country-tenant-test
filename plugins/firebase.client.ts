import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrIudzjFc5R6oQMgq8FOxdhxj0isybBDI",
  authDomain: "blackcountry-576e3.firebaseapp.com",
  projectId: "blackcountry-576e3",
  storageBucket: "blackcountry-576e3.firebasestorage.app",
  messagingSenderId: "67001512640",
  appId: "1:67001512640:web:8be16baaea30c284bb3325",
  measurementId: "G-RFZD5YV4EB"
};

export default defineNuxtPlugin(() => {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);

  // Provide Firebase and Auth services globally in the app
  return {
    provide: {
      firebaseApp,
      auth,
    },
  };
});
