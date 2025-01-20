import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataFormView } from "../views/UserDataFormView.jsx"; // Importera view

function UserDataFormPresenter({ model }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    year: "",
    program: "",
    email: "",
  });

  const navigate = useNavigate();

  // Hantera ändringar i formulärfält
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hantera formulärets inskick
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      alert("Please fill in all fields.");
      return;
    }
    model.userData = formData; // Spara användardata i modellen
    navigate("/test/1"); // Navigera till testvyn
  };

  // Rendera UserDataFormView och skicka props
  return (
    <UserDataFormView
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export { UserDataFormPresenter };
