import React from "react";
import "../style.css"; // Importera CSS-filen

function StartView({ onNavigateToLogin }) {
  return (
    <div className="start-container">
      <h1 className="start-title">Instruktioner för Testet – Musikens Entropi och Omedelbar Koncentration</h1>
      <p className="start-description">
        Detta test syftar till att undersöka hur olika ljudmiljöer påverkar
        koncentration och prestation vid kortare uppgifter. Genom att analysera
        reaktionstid och noggrannhet under varierande ljudförhållanden får vi
        en inblick i hur bakgrundsmusik kan påverka din omedelbara uppmärksamhet.
      </p>

      <h2 className="section-title">Så går testet till</h2>
      <ul className="start-list">
        <li>Uppgiften är att para ihop identiska par så snabbt som möjligt.</li>
        <li>Du kommer att se flera skepp på skärmen. Målet är att identifiera alla identiska par.</li>
        <li>Klicka på skepp för att markera dem som ett par. Om du vill avmarkera ett skepp, klicka på det igen.</li>
        <li>När du tror att du hittat alla identiska par, klickar du på knappen “Klar” för att slutföra testet.</li>
      </ul>

      <h2 className="section-title">Ljudmiljöer under testet</h2>
      <ul className="start-list">
        <li><strong>Test 1-4:</strong> Slumpade ljudmiljöer:
          <ul className="start-sublist">
          <li>Tyst</li>
            <li>Låg entropi (enkel och repetitiv musik)</li>
            <li>Medelhög entropi (måttligt komplex musik)</li>
            <li>Hög entropi (komplex och varierad musik)</li>
          </ul>
        </li>
      </ul>

      <h2 className="section-title">Så här ser testet ut:</h2>
      <div className="image-container">
        <img src="/images/TestShip_infobild.jpg" alt="Testbild" className="test-image" />
      </div>

      <h2 className="section-title">Tips för bästa resultat:</h2>
      <ul className="start-list">
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