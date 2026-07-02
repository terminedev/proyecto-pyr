// import { useEffect, useState } from "react";
// import type { Question, Answers } from "./logic-game/interfaces";
// import {
//   getRandomQuestions,
//   answerQuestion,
//   evaluateScore,
//   checkRecord
// } from './logic-game/functions';

// export default function App() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [record, setRecord] = useState(0);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     setQuestions(getRandomQuestions());
//   }, []);

//   const handleAnswer = (selectedOption: Answers) => {
//     const currentQuestion = questions[currentIndex];
//     const isCorrect = answerQuestion(currentQuestion, selectedOption);

//     // Calcular puntos (usamos currentIndex + 1 para que la base sea 1)
//     const points = evaluateScore(isCorrect, currentIndex + 1);
//     const newTotalScore = score + (isCorrect ? points : -points);

//     setScore(newTotalScore);

//     // Pasar a la siguiente pregunta o finalizar
//     if (currentIndex + 1 < questions.length) {
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       setRecord(checkRecord(record, newTotalScore));
//       setGameOver(true);
//     }
//   };

//   const restartGame = () => {
//     setQuestions(getRandomQuestions());
//     setCurrentIndex(0);
//     setScore(0);
//     setGameOver(false);
//   };

//   if (questions.length === 0) return <p>Cargando...</p>;

//   if (gameOver) {
//     return (
//       <main>
//         <h1>Juego Terminado</h1>
//         <p>Tu puntaje final: <strong>{score}</strong></p>
//         <p>Mejor Record: <strong>{record}</strong></p>
//         <button onClick={restartGame}>Jugar de nuevo</button>
//       </main>
//     );
//   }

//   const currentQ = questions[currentIndex];

//   return (
//     <main>
//       <h1>Proyecto PYR</h1>
//       <p>Pregunta {currentIndex + 1} de {questions.length}</p>
//       <p>Puntaje: {score}</p>

//       <hr />

//       <h2>{currentQ.question}</h2>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         {(Object.keys(currentQ.options) as Answers[]).map((key) => (
//           <button key={key} onClick={() => handleAnswer(key)}>
//             {key}: {currentQ.options[key]}
//           </button>
//         ))}
//       </div>
//     </main>
//   );
// }