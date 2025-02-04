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
    this.timeTaken = [];
    this.pairs = [];
    this.correctSelections = 0;
    this.missedIdenticalPairs = 0;
    this.incorrectSelections = 0;
    this.identicalPairCount = 2;
    this.soundFiles = [];
    this.testSaved = false;

    makeAutoObservable(this);

    this.initializeSounds();
  }

  initializeSounds() {
    const sounds = ["noise1.mp3", "noise2.mp3", "noise3.mp3", "noise4.mp3"];
    this.soundFiles = ["noise0.mp3", ...sounds.sort(() => Math.random() - 0.5)];
    console.log("Slumpad ljudordning:", this.soundFiles);
  }

  getCurrentSound() {
    return this.soundFiles[this.testNumber - 1];
  }

  updateUserData(data) {
    this.userData = { ...data };
  }

  startTest() {
    this.generatePairs();
    this.correctSelections = 0;
    this.missedIdenticalPairs = 0;
    this.incorrectSelections = 0;
    this.testSaved = false;
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

    this.pairs = [...identicalPairs, ...nonIdenticalPairs].sort(() => Math.random() - 0.5);
    console.log("Genererade par:", this.pairs);
  }
  selectPair(index) {
    const pair = this.pairs[index];
    if (!pair.selected) {
        this.pairs[index].selected = true;

        if (pair.isIdentical) {
            this.correctSelections += 1;
        } else {
            this.incorrectSelections += 1; // Öka vid fel markering
            console.log("Fel par markerat! incorrectSelections:", this.incorrectSelections);
        }
    } else {
        this.pairs[index].selected = false; // Avmarkera par
        if (pair.isIdentical) {
            this.correctSelections -= 1;
        } else {
            if (this.incorrectSelections > 0) {
                this.incorrectSelections -= 1; // Minska vid avmarkering av felaktig
            }
        }
    }
}


  startTimer() {
    this.startTime = Date.now();
  }

  completeTest(duration) {
    const durationInSeconds = duration.toFixed(2);
    this.calculateMissedPairs(); // Beräkna antalet missade par
    this.saveTestData(durationInSeconds);

    if (this.testNumber === 5) {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  calculateMissedPairs() {
    // Räkna antalet identiska par som inte är markerade
    this.missedIdenticalPairs = this.pairs.filter(
      (pair) => pair.isIdentical && !pair.selected
    ).length;
    console.log("Missade identiska par:", this.missedIdenticalPairs);
  }

  startNextTest() {
    if (this.testNumber < 5) {
      this.testNumber += 1;
      console.log(`Startar nästa test, testnummer: ${this.testNumber}`);
      this.startTest();
    } else {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  async saveTestData(durationInSeconds) {
    if (this.testSaved) return;
    this.testSaved = true;

    const soundFile = this.getCurrentSound();
    const collectionName = soundFile.replace(".mp3", "");

    try {
      await saveTestResult(
        this.userData,
        this.testNumber,
        durationInSeconds,
        soundFile,
        this.missedIdenticalPairs, // Skickar korrekta värden
        this.incorrectSelections,
        collectionName
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

