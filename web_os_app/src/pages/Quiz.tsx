import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MapaInteractivo from "../components/MapaInteractivo";
import "./styles.css";

type LocationState = { target?: string };

type Pos = { x: number; y: number };

const letterPositions: Record<string, Pos> = {
  A: { x: 9, y: 4 },
  B: { x: 4, y: 0 },
  C: { x: 2, y: 2 },
  D: { x: 0, y: 4 }
};

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const target = state?.target || null;

  const [posicion, setPosicion] = useState<Pos>({ x: 0, y: 4 });
  const [direccion, setDireccion] = useState(1);
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('Usa las flechas para mover a Tina y sitúala en la letra que creas correcta');
  const [guardado, setGuardado] = useState(false);

  // Movimiento con teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
        let nuevaPos = { ...posicion };
        let nuevaDir = direccion;
        switch(e.key) {
          case 'ArrowUp': nuevaPos.y = Math.max(0, posicion.y - 1); nuevaDir = 0; break;
          case 'ArrowRight': nuevaPos.x = Math.min(9, posicion.x + 1); nuevaDir = 1; break;
          case 'ArrowDown': nuevaPos.y = Math.min(9, posicion.y + 1); nuevaDir = 2; break;
          case 'ArrowLeft': nuevaPos.x = Math.max(0, posicion.x - 1); nuevaDir = 3; break;
        }
        setPosicion(nuevaPos);
        setDireccion(nuevaDir);
        setMensaje('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [posicion, direccion]);

  const handleLetraClick = (letra: string) => {
    if (guardado) return;
    setLetraSeleccionada(letra);
    setMensaje('');
  };

  const handleGuardar = () => {
    if (guardado) return;
    // primero, comprobar si está en una casilla de letra
    const onLetterCell = Object.entries(letterPositions).find(
      ([letra, pos]) => pos.x === posicion.x && pos.y === posicion.y
    );
    if (!onLetterCell) {
      setMensaje('Tina no está en una casilla con letra. Muévela hasta una letra antes de guardar.');
      return;
    }
    if (!letraSeleccionada) {
      setMensaje('Selecciona una letra antes de guardar.');
      return;
    }
    setGuardado(true);
    // comparar con target
    if (letraSeleccionada === target && letraSeleccionada === onLetterCell[0]) {
      setMensaje(`¡Correcto! Llegaste a la letra ${target}.`);
    } else {
      setMensaje(`Incorrecto. La letra objetivo era ${target}, pero estás en ${onLetterCell[0]} y seleccionaste ${letraSeleccionada}.`);
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="title">¿A qué letra ha llegado Tina?</h1>
      <p className="mensaje-accion">{mensaje}</p>

      <MapaInteractivo
        posicion={posicion}
        direccion={direccion}
        letraSeleccionada={letraSeleccionada}
        onMovimiento={(pos, dir) => { setPosicion(pos); setDireccion(dir); setMensaje(''); }}
        onLetraClick={handleLetraClick}
      />

      <div className="opciones-letras">
        {['A','B','C','D'].map(letra => (
          <div
            key={letra}
            className={`opcion-letra ${letraSeleccionada === letra ? 'seleccionada' : ''}`}
            onClick={() => handleLetraClick(letra)}
          >{letra}</div>
        ))}
      </div>

      <button
        className="boton-guardar"
        onClick={handleGuardar}
        disabled={guardado}
      >Guardar</button>
    </div>
  );
};

export default Quiz;
