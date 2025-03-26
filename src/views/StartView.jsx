import React, { useRef, useState } from "react";
import "../style.css"; // Importera CSS-filen

function StartView({ onNavigateToLogin }) {
    const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStartClick = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause(); // Pausa ljud om det spelas
      setIsPlaying(false);
    }
    onNavigateToLogin(); // Navigera till test
  };

  return (
    <div className="start-container">
      <h1 className="start-title">Instruktioner för Testet</h1>

      <h2 className="section-title">Så går testet till</h2>
      <ul className="start-list">
      <li>Du kommer göra fyra tester i olika ljudmiljöer, varav en är tyst.</li>
        <li>Uppgiften är att para ihop identiska par så snabbt som möjligt.</li>
        <li>Du kommer att se flera skepp på skärmen. Målet är att identifiera alla identiska par.</li>
        <li>Klicka på skepp för att markera dem som ett par. Om du vill avmarkera ett skepp, klicka på det igen.</li>
        <li>När du tror att du hittat alla identiska par, klickar du på knappen “Klar” för att slutföra testet.</li>
        
      </ul>


      <h2 className="section-title">Så här ser testet ut:</h2>
      <div className="image-container">
        <img src="/images/TestShip_infobild.jpg" alt="Testbild" className="test-image" />
      </div>

      <h2 className="section-title">Innan du börjar testet:</h2>
      <ul className="start-list">
        <li>Se till att ha samma ljudnivå på datorn för alla testerna.</li>
        <li>Använd hörlurar för att säkerställa att du hör ljudmiljöerna tydligt.</li>
        <li>Välj en lugn miljö för att minimera störningar utanför själva testet.</li>
        <li>Fokusera på att vara snabb, men noggrann!</li>
      </ul>

      <h2 className="section-title">Testa ljudvolym</h2>
      <p>Lyssna på ljuden nedan, och hitta ett bekvämt volymläge.</p>
      <div className="audio-player">
        <audio ref={audioRef} src="/public/sounds/testsound.mp3" />
        <button className="starttest-button" onClick={toggleAudio}>
          {isPlaying ? "⏸ Pausa ljud" : "▶ Spela upp ljud"}
        </button>
      </div>
      <div className="button-container">
        <button className="starttest-button" onClick={handleStartClick}>
          Starta testet
        </button>
      </div>
    </div>
  );
}
export { StartView };