import React from "react";

function ResultsView({ userData, timeTaken }) {
  return (
    <div>
      <h1>Test Resultat</h1>
      <p>Tack för din medverkan, {userData.fullName}!</p>
      <p>Dina testresultat är:</p>
      <ul>
        {timeTaken.map((time, index) => (
          <li key={index}>Test {index + 1}: {time} sekunder</li>
        ))}
      </ul>
    </div>
  );
}

export { ResultsView };
