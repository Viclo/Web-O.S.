import React, { useEffect } from 'react';
import './MapaInteractivo.css';

interface Posicion {
  x: number;
  y: number;
}

interface Letra {
  letra: string;
  x: number;
  y: number;
}

interface MapaInteractivoProps {
  posicion: Posicion;
  direccion: number;
  letraSeleccionada: string | null;
  onMovimiento: (nuevaPos: Posicion, nuevaDir: number) => void;
  onLetraClick: (letra: string) => void;
  letras: Letra[];
}

const CustomMapGame: React.FC<MapaInteractivoProps> = ({
                                                   posicion,
                                                   direccion,
                                                   letraSeleccionada,
                                                   onMovimiento,
                                                   onLetraClick,
                                                   letras
                                                 }) => {
  const mapa = [
    ['', '🌳', '', '', '', '🌳', '', '', '', ''],
    ['', '', '', '🌳', '▢', '', '', '🌳', '', ''],
    ['', '🌳', '', '▢', '▢', '▢', '', '', '', ''],
    ['🌳', '', '▢', '🏠', '', '▢', '🌳', '', '', '🌳'],
    ['', '▢', '▢', '', '', '▢', '▢', '▢', '▢', ''],
    ['', '🌳', '▢', '', '', '', '', '▢', '🏠', ''],
    ['🌳', '', '▢', '▢', '▢', '▢', '', '▢', '', '🌳'],
    ['', '', '▢', '🏠', '', '▢', '', '▢', '🌳', ''],
    ['', '🌳', '▢', '', '▢', '', '▢', '▢', '', ''],
    ['🌳', '', '▢', '🌳', '', '', '🌳', '', '', '🌳']
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        let nuevaPos = { ...posicion };
        let nuevaDir = direccion;

        switch (e.key) {
          case 'ArrowUp':
            nuevaPos.y = Math.max(0, posicion.y - 1);
            nuevaDir = 0;
            break;
          case 'ArrowRight':
            nuevaPos.x = Math.min(9, posicion.x + 1);
            nuevaDir = 1;
            break;
          case 'ArrowDown':
            nuevaPos.y = Math.min(9, posicion.y + 1);
            nuevaDir = 2;
            break;
          case 'ArrowLeft':
            nuevaPos.x = Math.max(0, posicion.x - 1);
            nuevaDir = 3;
            break;
        }

        const celda = mapa[nuevaPos.y][nuevaPos.x];
        const esLetra = letras.some(l => l.x === nuevaPos.x && l.y === nuevaPos.y);

        if (celda === '▢' || esLetra) {
          onMovimiento(nuevaPos, nuevaDir);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [posicion, direccion, onMovimiento, letras]);

  return (
    <div className="mapa-container">
      {mapa.map((fila, y) => (
        <div key={y} className="fila">
          {fila.map((celda, x) => {
            const letraObj = letras.find(l => l.x === x && l.y === y);
            const esCamino = celda === '▢';
            const esElemento = ['🌳', '🏠'].includes(celda);

            return (
              <div
                key={x}
                className={`casilla 
                  ${esCamino ? 'camino' : ''}
                  ${esElemento ? 'con-elemento' : ''}
                  ${letraObj ? 'con-letra' : ''}
                  ${posicion.x === x && posicion.y === y ? 'activa' : ''}
                `}
                onClick={() => letraObj && onLetraClick(letraObj.letra)}
              >
                {celda === '🌳' && <div className="arbol" />}
                {celda === '🏠' && <div className="casa" />}
                {letraObj && (
                  <div className={`letra ${letraSeleccionada === letraObj.letra ? 'seleccionada' : ''}`}>
                    {letraObj.letra}
                  </div>
                )}
                {posicion.x === x && posicion.y === y && (
                  <div
                    className="flecha"
                    style={{ transform: `rotate(${direccion * 90}deg)` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CustomMapGame;
