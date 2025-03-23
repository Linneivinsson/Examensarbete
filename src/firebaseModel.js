// firebaseModel.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

// Firebase-konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBWU96nTYbIhXG267hnjqM2QEtpCoOuN-o",
  authDomain: "examensarbete-ea1a9.firebaseapp.com",
  databaseURL: "https://examensarbete-ea1a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "examensarbete-ea1a9",
  storageBucket: "examensarbete-ea1a9.appspot.com",
  messagingSenderId: "436329343250",
  appId: "1:436329343250:web:a8529dbbb11ec1c88c2bcb",
  measurementId: "G-CP1TJLQKVG",
};

// Initiera Firebase och Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const saveTestResult = async (
  userData,
  testNumber,
  duration,
  soundFile,
  correctSelections,
  incorrectSelections,
  controlData,
  totalPairs,  
  identicalPairCount,

  
) => {
  try {
    const userCollection = collection(db, userData.email); // Använd e-post som unikt ID

    // Spara personlig information
    await setDoc(doc(userCollection, "personal information"), userData);

    // Spara kontrollfrågor
    await setDoc(doc(userCollection, "control questions"), controlData);

    // Använd soundFile som dokumentnamn (t.ex. noise3)
    const soundFileName = soundFile.replace(".mp3", ""); // Ta bort .mp3 för att matcha dokumentnamn
    const noiseDocName = soundFileName; // Dokumentet döps efter ljudfilen

    await setDoc(doc(userCollection, noiseDocName), {
      duration,
      incorrectSelections,
      correctSelections,
      soundFile,        // För referens
      testNumber,       
      totalPairs,  // Sparar totalPairs i Firestore
      identicalPairCount, // Sparar identicalPairCount i Firestore
      timestamp: new Date().toISOString(),
    });

    console.log(`Resultat sparat under användare: ${userData.email}, Dokument: ${noiseDocName}`);
  } catch (error) {
    console.error("Fel vid sparning av testresultat:", error);
  }
};


export { saveTestResult };
