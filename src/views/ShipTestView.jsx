import React, { useEffect, useState } from "react";

function ShipTestView({ testNumber, onComplete }) {
  const [pairs, setPairs] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [helpMessage, setHelpMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const playSound = () => {
    if (testNumber < 1 || testNumber > 4) {
      console.error(`Ogiltigt testnummer: ${testNumber}`);
      return () => {};
    }

    const soundPath = `/noise/noise${testNumber}.mp3`;
    console.log("Försöker spela ljud:", soundPath);

    const audio = new Audio(soundPath);
    audio.loop = true;

    audio.play()
      .then(() => console.log("Ljud spelas"))
      .catch((error) => console.error("Fel vid uppspelning av ljud:", error));

    return () => audio.pause();
  };

  useEffect(() => {
    const stopSound = playSound();

    // Generera nya par för testet
    const newPairs = [];
    for (let i = 0; i < 300; i++) {
      const isIdentical = Math.random() < 0.4;
      const shipType = Math.random() < 0.5 ? "ship1" : "ship2";
      newPairs.push({
        left: shipType,
        right: isIdentical ? shipType : shipType === "ship1" ? "ship2" : "ship1",
        selected: false,
        isIdentical,
      });
    }
    setPairs(newPairs);
    setStartTime(Date.now());
    setCompleted(false);
    setShowHelp(false);

    return stopSound; // Stoppa ljudet när komponenten avmonteras
  }, [testNumber]);

  const handleSelection = (index) => {
    const newPairs = pairs.slice();
    newPairs[index].selected = !newPairs[index].selected;
    setPairs(newPairs);

    // Kontrollera om användaren kan gå vidare till nästa test
    const wronglyMarked = newPairs.some((pair) => !pair.isIdentical && pair.selected);
    const unmarkedIdentical = newPairs.some((pair) => pair.isIdentical && !pair.selected);

    if (!wronglyMarked && !unmarkedIdentical) {
      setCanProceed(true);
      const currentDuration = Date.now() - startTime;
      setDuration(currentDuration); // Spara den avslutade tiden
      setCompleted(true); // Markera testet som klart
    } else {
      setCanProceed(false); // Användaren kan inte gå vidare
    }
  };

  const handleHelp = () => {
    const unmarkedIdentical = pairs.filter((pair) => pair.isIdentical && !pair.selected).length > 0;
    const wronglyMarked = pairs.filter((pair) => !pair.isIdentical && pair.selected).length > 0;

    if (wronglyMarked) {
      setHelpMessage("Du har felmarkerat par.");
    } else if (unmarkedIdentical) {
      setHelpMessage("Du har inte markerat alla identiska par.");
    } else {
      setHelpMessage("Allt ser korrekt ut!");
    }
    setShowHelp(true);
  };

  const closeHelp = () => {
    setShowHelp(false);
  };

  const handleNext = () => {
    if (canProceed) {
      onComplete(duration); // Skicka resultatet vidare och navigera till nästa test
    } else {
      alert("Du måste rätta dina markeringar innan du går vidare.");
    }
  };

  return (
    <div>
      {!completed && (
        <>
          <div id="testContainer">
            {pairs.map((pair, index) => (
              <div
                key={index}
                onClick={() => handleSelection(index)}
                className={`pair ${pair.selected ? "selected" : ""}`}
              >
                <img src={`/images/${pair.left}.svg`} alt="Left Ship" />
                <img src={`/images/${pair.right}.svg`} alt="Right Ship" />
              </div>
            ))}
          </div>
          <button
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleHelp}
          >
            Hjälp
          </button>
        </>
      )}
      {completed && canProceed && (
        <div className="modal-overlay">
          <div className="modal-content">
            {testNumber < 4 ? (
              <>
                <h2>Nu vidare till nästa test</h2>
                <button className="login-button" onClick={handleNext}>
                  Nästa
                </button>
              </>
            ) : (
              <>
                <h2>Testerna är avslutade</h2>
                <button className="login-button" onClick={handleNext}>
                  Se resultat
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {showHelp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Hjälp</h2>
            <p>{helpMessage}</p>
            <button className="login-button" onClick={closeHelp}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { ShipTestView };
