import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // si usas React Router
import "../styles/styles.css";

type LetterKey = "A" | "B" | "C" | "D";

// Define aquí las rutas de instrucciones para cada letra destino
const instructionSets: Record<LetterKey, string[]> = {
  A: [
    "road, road, lawn",
    "road, road, house",
    "tree, house, road",
    "road, road, tree",
    "house, road, tree",
    "tree, road, road",
    "tree, road, tree",
    "road, road, road",
  ],
  B: [
    "tree, road, house",
    "road, road, road",
    "tree, road, tree",
    "road, road, lawn",
    "road, lawn, tree",
    "house, road, road",
    "road, road, tree",
    "tree, road, tree",
  ],
  C: [
    "tree, road, tree",
    "road, road, lawn",
    "road, road, road",
    "tree, road, house",
    "road, road, tree",
    "road, lawn, tree",
    "house, road, tree",
    "tree, road, road",
  ],
  D: [
    "road, lawn, tree",
    "road, road, tree",
    "tree, road, tree",
    "tree, road, tree",
    "road, house, road",
    "road, road, road",
    "tree, road, tree",
    "house, road, tree",
  ],
};

const Home: React.FC = () => {
  const [chosenLetter, setChosenLetter] = useState<LetterKey | null>(null);
  const [instructions, setInstructions] = useState<string[]>([]);
  const navigate = useNavigate(); // para pasar la letra al juego

  useEffect(() => {
    // Elegir una letra aleatoria al montar el componente
    const letters: LetterKey[] = ["A", "B", "C", "D"];
    const random = letters[Math.floor(Math.random() * letters.length)];
    setChosenLetter(random);
    setInstructions(instructionSets[random]);
  }, []);

  const handleStart = () => {
     if (!chosenLetter) return;
    // Redirige a la página de juego y envía la letra correcta
    navigate('/Quiz', { state: { target: chosenLetter } });
  };

  return (
    <div className="home-container">
      <h1 className="title">Bienvenido al juego "Escuchar y Caminar"</h1>
      <div className="home-description">
        <p>
          Tina, una persona con discapacidad visual, camina por la ciudad guiada por sus gafas parlantes inteligentes.
          Estas gafas están equipadas con cámaras y un sistema de reconocimiento de objetos que puede identificar:
          <strong> una casa, un árbol, una carretera y césped</strong>.
        </p>
        <p>
          Cada vez que Tina entra en una nueva casilla de carretera, las gafas le indican —en este orden— qué hay a su izquierda, al frente y a su derecha.
        </p>
        <p>
          Tina comienza en la casilla marcada con una flecha, mirando en la dirección de la flecha, y escucha las siguientes indicaciones:
        </p>
        <ul className="instructions">
          {instructions.map((inst, idx) => (
            <li key={idx}>{inst}</li>
          ))}
        </ul>
        <p>
          Al final, Tina llega a una de las casillas marcadas con una letra.
        </p>
        <p className="question">
          <strong>Pregunta:</strong> ¿A qué letra ha llegado Tina en el mapa?
        </p>
        <button className="btn-start" onClick={handleStart} disabled={!chosenLetter}>
          Empezar juego
        </button>
      </div>
    </div>
  );
};

export default Home;