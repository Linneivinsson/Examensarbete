
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBWU96nTYbIhXG267hnjqM2QEtpCoOuN-o",
  authDomain: "examensarbete-ea1a9.firebaseapp.com",
  projectId: "examensarbete-ea1a9",
  storageBucket: "examensarbete-ea1a9.firebasestorage.app",
  messagingSenderId: "436329343250",
  appId: "1:436329343250:web:a8529dbbb11ec1c88c2bcb",
  measurementId: "G-CP1TJLQKVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const saveTestResult = async (userData, testNumber, duration) => {
    try {
      const resultsRef = collection(db, "testResults");
      await addDoc(resultsRef, {
        ...userData,
        testNumber,
        duration,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };
  
  export { saveTestResult };