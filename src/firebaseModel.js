// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWU96nTYbIhX267hnjqM2QEtpCoOuN-o",
  authDomain: "examensarbete-ea1a9.firebaseapp.com",
  projectId: "examensarbete-ea1a9",
  storageBucket: "examensarbete-ea1a9.firebasestorage.app",
  messagingSenderId: "436329343250",
  appId: "1:436329343250:web:a8529dbbb11ec1c88c2bcb",
  measurementId: "G-CP1TJLQKVG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Function to save test results
const saveTestResult = async (userData, testNumber, duration, soundFile) => {
  try {
    // Define the collection for the current test
    const testCollection = collection(db, `test${testNumber}`);
    // Add a new document to the collection
    await addDoc(testCollection, {
      ...userData,
      testNumber,
      duration,
      soundFile,
      timestamp: new Date().toISOString(),
    });
    console.log(`Result saved in test${testNumber}`);
  } catch (error) {
    console.error("Error saving test result:", error);
  }
};

export { saveTestResult };
