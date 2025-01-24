import { makeAutoObservable } from "mobx";
import { saveTestResult } from "./firebaseModel";

class Model {
  constructor() {
    this.userData = {
      fullName: "",
      gender: "",
      age: "",
      year: "",
      program: "",
      email: "",
    };
    this.testNumber = 1;
    this.timeTaken = []; // Tiderna sparas i sekunder
    this.pairs = [];
    this.correctSelections = 0;
    this.identicalPairCount = 2; // Antalet identiska par per test
    this.soundFiles = []; // Slumpad ljudordning för tester

    makeAutoObservable(this);

    this.initializeSounds(); // Slumpa ljudordningen vid modellens skapande
  }

  initializeSounds() {
    const sounds = ["noise1.mp3", "noise2.mp3", "noise3.mp3", "noise4.mp3"];
    this.soundFiles = sounds.sort(() => Math.random() - 0.5);
    console.log("Slumpad ljudordning:", this.soundFiles);
  }

  getCurrentSound() {
    return this.soundFiles[this.testNumber - 1]; // Returnerar ljud för aktuellt test
  }

  updateUserData(data) {
    this.userData = { ...data };
  }

  startTest() {
    this.generatePairs();
    this.correctSelections = 0;
    this.startTimer();
  }

  generatePairs() {
    const shipTypes = ["ship1", "ship2"];
    const totalPairs = 10;
    const identicalPairCount = 4;
  
    const identicalPairs = [];
    const nonIdenticalPairs = [];
  
    for (let i = 0; i < identicalPairCount; i++) {
      const shipType = shipTypes[i % shipTypes.length];
      identicalPairs.push({
        left: shipType,
        right: shipType,
        selected: false,
        isIdentical: true,
      });
    }
  
    for (let i = 0; i < totalPairs - identicalPairCount; i++) {
      const leftShip = shipTypes[i % shipTypes.length];
      const rightShip = shipTypes[(i + 1) % shipTypes.length];
      nonIdenticalPairs.push({
        left: leftShip,
        right: rightShip,
        selected: false,
        isIdentical: false,
      });
    }
  
    // Kombinera och uppdatera endast en gång
    const updatedPairs = [...identicalPairs, ...nonIdenticalPairs].sort(() => Math.random() - 0.5);
    console.log("Genererade par:", updatedPairs); // Lägg till loggning
    this.pairs = updatedPairs; // Uppdatera här
  }

  selectPair(index) {
    const pair = this.pairs[index];
    if (!pair.selected) {
      this.pairs[index].selected = true;

      if (pair.isIdentical) {
        this.correctSelections += 1;
      } else {
        console.log("Fel par markerat!");
      }

      if (
        this.correctSelections ===
        this.pairs.filter((p) => p.isIdentical).length
      ) {
        const duration = Date.now() - this.startTime;
        this.completeTest(duration);
      }
    } else {
      this.pairs[index].selected = false; // Avmarkera par
      if (pair.isIdentical) {
        this.correctSelections -= 1;
      }
    }
  }

  startTimer() {
    this.startTime = Date.now();
  }

  completeTest(duration) {
    const durationInSeconds = (duration / 1000).toFixed(2); // Konvertera millisekunder till sekunder (två decimaler)
    this.saveTestData(durationInSeconds); // Spara tid i sekunder

    if (this.testNumber === 4) {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  startNextTest() {
    if (this.testNumber < 4) {
      this.testNumber += 1; // Gå till nästa test
      this.startTest();
    } else {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  async saveTestData(durationInSeconds) {
    const soundFile = this.getCurrentSound(); // Hämta aktuellt ljud för testet
    const collectionName = soundFile.replace(".mp3", ""); // Ta bort filändelsen för att skapa samlingsnamn
  
    try {
      await saveTestResult(
        this.userData,
        this.testNumber,
        durationInSeconds,
        soundFile,
        collectionName // Skicka samlingsnamnet till funktionen
      );
      console.log(`Resultat sparat i ${collectionName}`);
    } catch (error) {
      console.error("Fel vid sparning av testresultat:", error);
    }
  
    this.timeTaken.push(durationInSeconds);
  }
  
}

const model = new Model();

export { model };
