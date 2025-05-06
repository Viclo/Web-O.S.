import * as React from "react";
import "./styles.css";

const Home: React.FC = () => {
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
          Por ejemplo: <em>"árbol, carretera, casa"</em>.
        </p>
        <p>
          Tina comienza en la casilla marcada con una flecha, mirando en la dirección de la flecha, y escucha las siguientes indicaciones:
        </p>
        <ul className="instructions">
          <li>tree, road, house</li>
          <li>road, road, lawn</li>
          <li>tree, road, tree</li>
          <li>road, road, road</li>
          <li>tree, road, tree</li>
          <li>tree, house, road</li>
          <li>road, road, tree</li>
          <li>house, road, tree</li>
        </ul>
        <p>
          Al final, Tina llega a una de las casillas marcadas con una letra.
        </p>
        <p className="question">
          <strong>Pregunta:</strong> ¿A qué letra ha llegado Tina en el mapa?
        </p>
        <p>
          (Haz clic en la letra que creas correcta. Presiona <em>'Guardar'</em> cuando hayas terminado).
        </p>
      </div>
    </div>
  );
};

export default Home;
