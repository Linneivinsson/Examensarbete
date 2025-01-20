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

    makeAutoObservable(this);
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
    const newPairs = [];
    for (let i = 0; i < 8; i++) {
      const isIdentical = Math.random() < 0.25;
      const shipType = Math.random() < 0.5 ? "ship1" : "ship2";
      newPairs.push({
        left: shipType,
        right: isIdentical ? shipType : shipType === "ship1" ? "ship2" : "ship1",
        selected: false,
        isIdentical,
      });
    }
    this.pairs = newPairs;
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
    const soundFile = `noise${this.testNumber}.mp3`; // Filnamn baserat på testnumret
    await saveTestResult(this.userData, this.testNumber, durationInSeconds, soundFile);
    this.timeTaken.push(durationInSeconds);
  }
}

const model = new Model();

export { model };

