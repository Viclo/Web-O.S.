// src/pages/RescuePythonGame.tsx
import React, { useState } from "react";
import "../styles/rescue.css";
import dogImg from "../assets/dog.png";
import snakeImg from "../assets/snake.png";
import houseImg from "../assets/house.png";        // casita en el recuadro
import newHouseImg from "../assets/doginhouse.png"; // casita con perrito al ganar
import snakeAttackImg from "../assets/snakeattack.png"; // serpiente atacando

const questions = [
  { question: "¿Qué imprime `print(2 ** 3)`?", options: ["5", "6", "8", "9"], answer: "8" },
  { question: "¿Cuál es la forma correcta de definir una función?", options: ["function hola()", "def hola():", "fun hola()", "define hola()"], answer: "def hola():" },
  { question: "¿Qué tipo de lenguaje es Python?", options: ["Compilado", "Interpretado", "Ensablador", "Binario"], answer: "Interpretado" },
];

export default function RescuePythonGame() {
  const [qIndex, setQIndex] = useState(0);
  const [dogPos, setDogPos] = useState(0);
  const [snakePos, setSnakePos] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnakeAttack, setShowSnakeAttack] = useState(false);
  const total = questions.length;
  const current = questions[qIndex];

  const handleAnswer = (opt: string) => {
    if (gameOver) return;

    if (opt === current.answer) {
      const nextDog = dogPos + 1;
      setDogPos(nextDog);
      setMessage("¡Correcto!");

      if (nextDog >= total) {
        setGameOver(true);
        setMessage("🎉 ¡Felicidades! El perrito llegó a casa 🏠");
      } else {
        setQIndex(qIndex + 1);
      }
    } else {
      const nextSnake = snakePos + 1;
      setSnakePos(nextSnake);
      setMessage("¡Incorrecto! 🐍 se acerca...");

      if (nextSnake >= dogPos) {
        // Avanza la serpiente hasta el perro
        setSnakePos(dogPos);
        setMessage("💀 ¡Perdiste! La serpiente atrapó al perrito 🐍");

        setTimeout(() => {
          setGameOver(true);
          setShowSnakeAttack(true);
        }, 600);
      }
    }
  };

  const restart = () => {
    setQIndex(0);
    setDogPos(0);
    setSnakePos(-1); // importante para que empiece fuera
    setGameOver(false);
    setMessage("");
    setShowSnakeAttack(false);
  };

  return (
    <div className="rescue-container">
      <h2>Rescata al Perrito de Python 🐶🐍</h2>

      <div className="path">
        {/* Casa siempre fija al final */}
        <img src={houseImg} className="house" alt="Casa" />

        {/* Perrito */}
        {!gameOver && (
          <img
            src={dogImg}
            className="dog"
           style={{
              left: `calc(${(dogPos / total) * 100}% + 50px)` // ajusta 40px según el ancho del perrito
           }}
            alt="Perrito"
          />
        )}

        {/* Serpiente */}
        {!gameOver && (
          <img
            src={snakeImg}
            className="snake"
            style={{ left: `${(snakePos / total) * 100}%` }}
            alt="Serpiente"
          />
        )}
      </div>

      {!gameOver ? (
        <>
          <div className="question">
            <h3>{current.question}</h3>
            <div className="options">
              {current.options.map((opt) => (
                <button key={opt} onClick={() => handleAnswer(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <p className="message">{message}</p>
        </>
      ) : (
        <div className="result">
          <p className="message">{message}</p>

          {/* Al ganar, mostrar la casita con perrito */}
          {message.includes("Felicidades") && (
            <img
              src={newHouseImg}
              className="house-with-dog"
              alt="Perrito en casa"
            />
          )}

          {/* Si perdió, mostrar imagen de ataque */}
          {showSnakeAttack && (
            <img
              src={snakeAttackImg}
              className="snake-attack"
              alt="Serpiente atrapando al perrito"
            />
          )}

          <button onClick={restart}>Jugar otra vez</button>
        </div>
      )}
    </div>
  );
}
