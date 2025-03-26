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
    const totalPairs = 550;
    const identicalPairCount = 100;
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

  // Shuffle identiska par för variation
  for (let i = identicalPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [identicalPairs[i], identicalPairs[j]] = [identicalPairs[j], identicalPairs[i]];
  }

  // Skapa en lista med positioner där vi ska placera identiska par
  const positions = new Set();
  let minSpacing = 4; // minsta avstånd mellan identiska par
  let maxSpacing = 10; // största avstånd (ger möjlighet till variation)

  let currentPos = Math.floor(Math.random() * minSpacing); // starta lite slumpmässigt

  for (let i = 0; i < identicalPairCount; i++) {
    currentPos += Math.floor(Math.random() * (maxSpacing - minSpacing + 1)) + minSpacing;
    if (currentPos >= totalPairs) break;
    positions.add(currentPos);
  }

  // Fyll på med ytterligare positioner om vi inte hunnit lägga alla
  while (positions.size < identicalPairCount) {
    const pos = Math.floor(Math.random() * totalPairs);
    positions.add(pos);
  }

  const finalPairs = [];
  let identicalIndex = 0;
  let nonIdenticalIndex = 0;

  for (let i = 0; i < totalPairs; i++) {
    if (positions.has(i) && identicalIndex < identicalPairs.length) {
      finalPairs.push(identicalPairs[identicalIndex++]);
    } else if (nonIdenticalIndex < nonIdenticalPairs.length) {
      finalPairs.push(nonIdenticalPairs[nonIdenticalIndex++]);
    }
  }

  this.pairs = finalPairs;
  console.log("Genererade par med varierad men balanserad fördelning:", this.pairs);
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
    // this.calculateMissedPairs();  // tas bort
    this.timeTaken.push(durationInSeconds);
  
    if (this.testNumber === 4) {
      console.log("Alla tester är klara!", this.timeTaken);
    }
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

  async saveTestData(durationInSeconds, testNumber, correctSelections, incorrectSelections) {
    const actualTestNumber = testNumber ?? this.testNumber;
    const cleanControlData = toJS(this.controlData);
    const soundFile = this.soundFiles[actualTestNumber - 1];
  
    try {
      await saveTestResult(
        this.userData,
        actualTestNumber,
        durationInSeconds,
        soundFile,
        correctSelections,
        incorrectSelections,
        cleanControlData,
        this.pairs.length,
        this.identicalPairCount
      );
      console.log(`Resultat sparat för test ${actualTestNumber}`);
    } catch (error) {
      console.error("Fel vid sparning av testresultat:", error);
    }
  }
  
  
}

const model = new Model();

export { model };

