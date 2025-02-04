// Importera de funktioner du behöver från Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Din webapp's Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBWU96nTYbIhXG267hnjqM2QEtpCoOuN-o",
  authDomain: "examensarbete-ea1a9.firebaseapp.com",
  databaseURL: "https://examensarbete-ea1a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "examensarbete-ea1a9",
  storageBucket: "examensarbete-ea1a9.appspot.com", // Fixad URL
  messagingSenderId: "436329343250",
  appId: "1:436329343250:web:a8529dbbb11ec1c88c2bcb",
  measurementId: "G-CP1TJLQKVG",
};

// Initiera Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initiera Firestore
const db = getFirestore(app); // Lägg till denna rad

const saveTestResult = async (userData, testNumber, duration, soundFile, missedPairs, incorrectSelections, collectionName) => {
  try {
    const noiseCollection = collection(db, collectionName);
    await addDoc(noiseCollection, {
      ...userData,
      testNumber,
      duration,
      soundFile,
      missedPairs,
      incorrectSelections,
      timestamp: new Date().toISOString(),
    });
    console.log(`Result sparat i samling: ${collectionName}`);
  } catch (error) {
    console.error("Error saving test result:", error);
  }
};



export { saveTestResult };
