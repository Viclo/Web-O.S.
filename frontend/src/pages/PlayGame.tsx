import * as React from "react";
import "./styles.css";
import { useState } from "react";
import MapGame from "../components/MapGame.tsx";

// Conjuntos de instrucciones para cada letra objetivo
const instruccionesSets: Record<string, string[]> = {
  A: [
    "lawn, road, tree",
    "road, lawn, road",
    "lawn, road, house",
    "tree, lawn, road",
    "tree, road, house",
    "road, road, lawn",
    "lawn, lawn, road",
    "tree, road, lawn",
    "road, lawn, lawn",
    "tree, road, lawn",
    "lawn, road, road",
    "lawn, road, house",
    "tree, lawn, lawn",
  ],
  B: [
    "road, road, lawn",
    "road, tree, road",
    "lawn, road, lawn",
    "house, road, tree",
    "road, road, tree",
    "lawn, tree, road",
    "road, lawn, house",
    "tree, lawn, road",
  ],
  C: [
    "tree, lawn, tree",
    "lawn, road, road",
    "tree, road, lawn",
    "road, tree, road",
    "house, road, lawn",
  ],
};
const letrasOrden = ["A", "B", "C"];

const PlayGame: React.FC = () => {
  const [posicion, setPosicion] = useState({ x: 0, y: 4 });
  const [direccion, setDireccion] = useState(1);
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Letra objetivo e instrucciones dinámicas
  const letraObjetivo = letrasOrden[currentIndex];
  const instrucciones = instruccionesSets[letraObjetivo];

  const handleMovimiento = (nuevaPos: any, nuevaDir: number) => {
    setPosicion(nuevaPos);
    setDireccion(nuevaDir);

    const letras = ['A','B','C','D'];
    if (
      letraSeleccionada &&
      letras.includes(letraSeleccionada) &&
      nuevaPos.x === posicion.x &&
      nuevaPos.y === posicion.y
    ) {
      alert(`¡Llegaste a la letra ${letraSeleccionada}!`);
    }
  };

  const handleCambiarInstruccion = () => {
    setCurrentIndex((prev) => (prev + 1) % letrasOrden.length);
    setLetraSeleccionada(null);
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
          Cada vez que Tina entra en una nueva casilla de carretera, las gafas le indican —en este orden—
          qué hay a su izquierda, al frente y a su derecha. Por ejemplo: <em>"tree, row, "</em>.
        </p>
       
        <ul className="instructions">
          {instrucciones.map((instr, i) => (
            <li key={i}>{instr}</li>
          ))}
        </ul>
        <button
          className="boton-cambiar-instruccion"
          onClick={handleCambiarInstruccion}
        >
          Cambiar instrucción
        </button>
        <p className="question">
          <strong>Pregunta:</strong> ¿A qué letra ha llegado Tina en el mapa?
        </p>
      </div>

      <div className="game-container">
        <MapGame
          posicion={posicion}
          direccion={direccion}
          letraSeleccionada={letraSeleccionada}
          onMovimiento={handleMovimiento}
          onLetraClick={setLetraSeleccionada}
        />

        <div className="directions">
          <p>Usa las flechas del teclado para mover a Tina</p>
          <button onClick={() => handleMovimiento(
            { x: posicion.x, y: Math.max(0, posicion.y - 1) }, 0
          )}>↑</button>
          <div>
            <button onClick={() => handleMovimiento(
              { x: Math.max(0, posicion.x - 1), y: posicion.y }, 3
            )}>←</button>
            <button onClick={() => handleMovimiento(
              { x: Math.min(9, posicion.x + 1), y: posicion.y }, 1
            )}>→</button>
          </div>
          <button onClick={() => handleMovimiento(
            { x: posicion.x, y: Math.min(9, posicion.y + 1) }, 2
          )}>↓</button>
        </div>
      </div>

      <div>
        <p>
          (Haz clic en la letra que creas correcta. Presiona <em>'Guardar'</em> cuando hayas terminado).
        </p>
        <div className="opciones-letras">
          {['A','B','C','D'].map((letra) => (
            <div
              key={letra}
              className={`opcion-letra ${letraSeleccionada === letra ? 'seleccionada' : ''}`}
              onClick={() => setLetraSeleccionada(letra)}
            >
              {letra}
            </div>
          ))}
        </div>

        <button
          className="boton-guardar"
          disabled={!letraSeleccionada}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default PlayGame;
