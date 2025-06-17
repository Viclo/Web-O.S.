import * as React from "react";
import { useState } from "react";
import CustomMapGame from "../components/CustomMapGame.tsx";
import "./styles.css";

const Quiz: React.FC = () => {
  const [posicion, setPosicion] = useState({ x: 0, y: 4 });
  const [direccion, setDireccion] = useState(1);
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState("");

  const [letras, setLetras] = useState([
    { letra: 'A', x: 9, y: 4 },
    { letra: 'B', x: 4, y: 0 },
    { letra: 'C', x: 2, y: 2 },
    { letra: 'D', x: 0, y: 4 }
  ]);

  const handleMovimiento = (nuevaPos: any, nuevaDir: number) => {
    setPosicion(nuevaPos);
    setDireccion(nuevaDir);

    const letraEncontrada = letras.find(
      (l) => l.letra === letraSeleccionada && l.x === nuevaPos.x && l.y === nuevaPos.y
    );

    if (letraEncontrada) {
      setMensaje(`¡Llegaste a la letra ${letraSeleccionada}!`);
    }
  };

  const actualizarLetra = (index: number, campo: 'x' | 'y', valor: number) => {
    const nuevas = [...letras];
    nuevas[index] = { ...nuevas[index], [campo]: valor };
    setLetras(nuevas);
  };

  return (
    <div>
      <h1 className="title">Crea tu propia pregunta</h1>
      <p>En esta sección puedes generar una pregunta de acuerdo a tus necesidades.</p>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Editor de posiciones</h3>
          <div className="letras-editor">
            {letras.map((l, index) => (
              <div key={l.letra} className="letra-row">
                <span>{l.letra}</span>
                <label>
                  X:
                  <input
                    type="number"
                    value={l.x}
                    min={0}
                    max={9}
                    onChange={(e) => actualizarLetra(index, 'x', parseInt(e.target.value))}
                  />
                </label>
                <label>
                  Y:
                  <input
                    type="number"
                    value={l.y}
                    min={0}
                    max={9}
                    onChange={(e) => actualizarLetra(index, 'y', parseInt(e.target.value))}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <CustomMapGame
            posicion={posicion}
            direccion={direccion}
            letraSeleccionada={letraSeleccionada}
            onMovimiento={handleMovimiento}
            onLetraClick={setLetraSeleccionada}
            letras={letras}
          />

          {/*<div className="opciones-letras">*/}
          {/*  {letras.map((l) => (*/}
          {/*    <div*/}
          {/*      key={l.letra}*/}
          {/*      className={`opcion-letra ${letraSeleccionada === l.letra ? 'seleccionada' : ''}`}*/}
          {/*      onClick={() => setLetraSeleccionada(l.letra)}*/}
          {/*    >*/}
          {/*      {l.letra}*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}

          {/*{mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}*/}

          {/*<button className="boton-guardar" disabled={!letraSeleccionada}>*/}
          {/*  Guardar*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
