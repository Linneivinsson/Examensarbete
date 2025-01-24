import React from "react";
import "../style.css"; // Importera CSS-filen

function StartView({ onNavigateToLogin }) {
  return (
    <div className="start-container">
      <h1>Hej</h1>
      <p>Välkommen till skeppstestet! Klicka på knappen nedan för att komma igång.</p>
      <button className="starttest-button" onClick={onNavigateToLogin}>
        Gå till testen
      </button>
    </div>
  );
}

export { StartView };
