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

// Funktion för att spara testresultat
const saveTestResult = async (userData, testNumber, duration, soundFile) => {
  try {
    // Definiera samlingen för nuvarande testnummer
    const collectionName = `noise${testNumber}`; // Dynamiskt samlingsnamn baserat på testnummer
    const noiseCollection = collection(db, collectionName);
    
    // Lägg till ett nytt dokument till samlingen
    await addDoc(noiseCollection, {
      ...userData,
      testNumber,
      duration,
      soundFile,
      timestamp: new Date().toISOString(),
    });
    console.log(`Result saved in ${collectionName}`);
  } catch (error) {
    console.error("Error saving test result:", error);
  }
};

export { saveTestResult };
