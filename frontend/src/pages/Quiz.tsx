import * as React from "react";
import {useState} from "react";
import MapGame from "../components/MapGame.tsx";
import "./styles.css";

const Quiz: React.FC = () => {
  const [posicion, setPosicion] = useState({ x: 0, y: 4 });
  const [direccion, setDireccion] = useState(1);
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(null);

  const handleMovimiento = (nuevaPos: any, nuevaDir: number) => {
    setPosicion(nuevaPos);
    setDireccion(nuevaDir);

    const letras = ['A','B','C','D'];
    if (letras.some(l => l === letraSeleccionada &&
        nuevaPos.x === posicion.x && nuevaPos.y === posicion.y)) {
      setMensaje(`¡Llegaste a la letra ${letraSeleccionada}!`);
    }
  };

  return (
    <div>
      <h1 className="title">Create tu propia pregunta.</h1>
      <p>En esta sección puedes generar una pregunta de acuerdo a tus necesidades.</p>

      <MapGame
        posicion={posicion}
        direccion={direccion}
        letraSeleccionada={letraSeleccionada}
        onMovimiento={handleMovimiento}
        onLetraClick={setLetraSeleccionada}
      />

      <div className="opciones-letras">
        {['A', 'B', 'C', 'D'].map(letra => (
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
  );
};

export default Quiz;
