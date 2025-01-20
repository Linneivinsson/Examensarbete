import React from "react";

function ResultsView({ userData, timeTaken }) {
  return (
    <div>
      <h1>Test Results</h1>
      <p>Thank you, {userData.fullName}!</p>
      <p>Your results:</p>
      <ul>
        {timeTaken.map((time, index) => (
          <li key={index}>Test {index + 1}: {time} milliseconds</li>
        ))}
      </ul>
    </div>
  );
}

export { ResultsView };
