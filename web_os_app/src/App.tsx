import { useState } from 'react';
import MapaInteractivo from './components/MapaInteractivo';
import './App.css';

function App() {
  const [posicion, setPosicion] = useState({ x: 0, y: 4 }); // Comienza en D
  const [direccion, setDireccion] = useState(1); // Mirando a la derecha
  const [letraSeleccionada, setLetraSeleccionada] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('Usa las flechas del teclado para mover a Tina');

  const handleMovimiento = (nuevaPos: Posicion, nuevaDir: number) => {
    setPosicion(nuevaPos);
    setDireccion(nuevaDir);
    
    // Verificar si llegó a una letra
    const letras = ['A','B','C','D'];
    if (letras.some(l => l === letraSeleccionada && 
        nuevaPos.x === posicion.x && nuevaPos.y === posicion.y)) {
      setMensaje(`¡Llegaste a la letra ${letraSeleccionada}!`);
    }
  };

  return (
    <div className="app">
      <h1>Pregunta:</h1>
      <p>A que letra del mapa llegara TINA?</p>
      <p>(Clic en la letra para seleccionarla y guardar!.)</p>
      
      <p className="mensaje-accion">{mensaje}</p>

      <div className="controles-direccion">
        <button onClick={() => handleMovimiento(
          { x: posicion.x, y: Math.max(0, posicion.y - 1) }, 0)}>↑</button>
        <div>
          <button onClick={() => handleMovimiento(
            { x: Math.max(0, posicion.x - 1), y: posicion.y }, 3)}>←</button>
          <button onClick={() => handleMovimiento(
            { x: Math.min(9, posicion.x + 1), y: posicion.y }, 1)}>→</button>
        </div>
        <button onClick={() => handleMovimiento(
          { x: posicion.x, y: Math.min(9, posicion.y + 1) }, 2)}>↓</button>
      </div>

      <MapaInteractivo
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
}

export default App;