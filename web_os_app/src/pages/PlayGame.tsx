import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const PlayGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Título y descripción del primer componente */}
      <h1 className="title text-2xl mb-4">Juega con nuestras preguntas Interactivas</h1>
      <p>En esta sección podrás jugar y aprender con nuestras preguntas interactivas.</p>
      
      {/* Contenido adicional del segundo componente */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="mb-3">¿Listo para el desafío de Python?</p>
        
        <button
          onClick={() => navigate("/rescate-python")}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition-colors"
        >
          Rescata al Perrito
        </button>
      </div>
    </div>
  );
}

export default PlayGame;