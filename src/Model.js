// Model.js
import { makeAutoObservable } from "mobx";
import { saveTestResult } from "./firebaseModel";
import { toJS } from "mobx";

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
    this.controlData = {
      usedHeadphones: "",
      testEnvironment: "",
      computerVolume: "",
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
    const sounds = ["no_noise1.mp3", "low_entropy_noise2.mp3", "medium_entropy_noise3.mp3", "high_entropy_noise4.mp3"];
    this.soundFiles = [...sounds.sort(() => Math.random() - 0.5)];
    console.log("Slumpad ljudordning:", this.soundFiles);
  }
  

  getCurrentSound() {
    // skyddar mot testNumber utanför gränser
    if (this.testNumber < 1 || this.testNumber > this.soundFiles.length) {
      console.warn("Ogiltigt testNumber:", this.testNumber);
      return null;
    }
    return this.soundFiles[this.testNumber - 1];
  }

  updateUserData(data) {
    this.userData = { ...data };
  }

  saveControlQuestions(data) {
    this.controlData = { ...data };
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
    const totalPairs = 300;
    const identicalPairCount = 50;
    this.identicalPairCount = identicalPairCount; 

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
        this.incorrectSelections += 1;
        console.log("Fel par markerat! incorrectSelections:", this.incorrectSelections);
      }
    } else {
      this.pairs[index].selected = false;
      if (pair.isIdentical) {
        this.correctSelections -= 1;
      } else {
        if (this.incorrectSelections > 0) {
          this.incorrectSelections -= 1;
        }
      }
    }
  }

  startTimer() {
    this.startTime = Date.now();
  }

  completeTest(duration) {
    const durationInSeconds = duration.toFixed(2);
    this.calculateMissedPairs();
    this.timeTaken.push(durationInSeconds);

    if (this.testNumber === 4) {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  calculateMissedPairs() {
    this.missedIdenticalPairs = this.pairs.filter(
      (pair) => pair.isIdentical && !pair.selected
    ).length;
    console.log("Missade identiska par:", this.missedIdenticalPairs);
  }

  startNextTest() {
    if (this.testNumber < 4) {
      this.testNumber += 1;
      console.log(`Startar nästa test, testnummer: ${this.testNumber}`);
      this.startTest();
    } else {
      console.log("Alla tester är klara!", this.timeTaken);
    }
  }

  async saveTestData(durationInSeconds, testNumber) {
    // Justera för att börja med noise0
    const actualTestNumber = testNumber ?? (this.testNumber); // -1 för att börja med noise0
    const cleanControlData = toJS(this.controlData);
    const soundFile = this.soundFiles[actualTestNumber]; // eller fixad indexering

  
    try {
      await saveTestResult(
        this.userData,
        actualTestNumber, // Sparar som noise0, noise1, etc.
        durationInSeconds,
        soundFile,
        this.missedIdenticalPairs,
        this.incorrectSelections,
        cleanControlData,
        this.pairs.length,  // totalPairs (räknar antalet genererade par)
        this.identicalPairCount // identicalPairCount (lagrat i modellen)
    


        
      );
      console.log(`Resultat sparat för test ${actualTestNumber}`);
    } catch (error) {
      console.error("Fel vid sparning av testresultat:", error);
    }
  }
  
}

const model = new Model();

export { model };

