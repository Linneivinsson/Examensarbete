import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlQuestionsView } from "../views/ControlQuestionsView.jsx";

function ControlQuestionsPresenter({ model }) {
  const [controlData, setControlData] = useState({
    usedHeadphones: "",
    infoEnvironment: "",
    clearVolume: "",
    testDistractions: "",
    unplannedDistractions: "",
    volumeChange: "",


  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setControlData((prev) => ({ ...prev, [name]: value }));
    console.log("Uppdaterat fält:", name, "med värde:", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(controlData).some((field) => !field)) {
      alert("Fyll i alla fält innan du fortsätter.");
      return;
    }

    try {
      model.saveControlQuestions(controlData);

      await Promise.all(
        model.timeTaken.map((duration, index) =>
          model.saveTestData(duration, index) // Index ger noise0 till noise4
        )
      );

      navigate("/results");
    } catch (error) {
      console.error("Fel vid sparning av kontrollfrågor:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <ControlQuestionsView
      formData={controlData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export { ControlQuestionsPresenter };
