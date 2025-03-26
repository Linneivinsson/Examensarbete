import React from "react";
import "../style.css"; // Importera CSS-filen

function StartView({ onNavigateToLogin }) {
  return (
    <div className="start-container">
      <h1 className="start-title">Instruktioner för Testet – Musikens Entropi och Omedelbar Koncentration</h1>
      <p className="start-description">
      Detta test syftar till att undersöka hur ljud med olika entropi påverkar
      direkt koncentration och prestation vid kortare uppgifter. Du kommer att genomföra
    samma test i fyra olika ljudmiljöer. Syftet är att se ett samband mellan musikens entropi
    och omedelbar koncentration för att kunna optimera ljudmiljön för bästa fokus 
      </p>

      <h2 className="section-title">Så går testet till</h2>
      <ul className="start-list">
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
      <li>Hela testet tar 5-10 minuter att genomföra. Du kan inte avbryta testet under tidens gång.</li>
      <li>Se till så att du redan innan du börjar testet har ljudet påslaget på datorn, gärna på medelvolym</li>
        <li>Se till att ha samma ljudnivå på datorn för alla testerna.</li>
        <li>Använd hörlurar för att säkerställa att du hör ljudmiljöerna tydligt.</li>
        <li>Välj en lugn miljö för att minimera störningar utanför själva testet.</li>
        <li>Fokusera på att vara snabb, men noggrann!</li>
      </ul>

      <div className="button-container">
        <button className="starttest-button" onClick={onNavigateToLogin}>
          Starta testet
        </button>
      </div>
    </div>
  );
}

export { StartView };