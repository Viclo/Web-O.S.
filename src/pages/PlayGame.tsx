import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlayGame() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">¡Bienvenido a Juega!</h1>
      <p>¿Listo para el desafío de Python?</p>
      <button
        onClick={() => navigate("/rescate-python")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
      >
        Rescata al Perrito
      </button>
    </div>
  );
}
