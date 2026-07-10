import { useRef, useState } from "react";
import type { Answers, GameData, Question } from "../../logic-game/interfaces";
import { answerQuestion, evaluateScore } from "../../logic-game/functions";
import EndGame from "../EndGame/EndGame";
import { NUMBER_OF_QUESTIONS } from "../../logic-game/constants";

// Definir la interface de Props
interface QuizListProps {
    list: Question[];
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
    overallScore: number;
    setOverallScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuizList({
    overallScore,
    setOverallScore,
    list,
    gameData,
    setGameData
}: QuizListProps) {

    // Pregunta actual:
    const currentQuestion = list[0];


    // Evaluar respuesta:
    const [response, setResponse] = useState({
        showResponse: false,
        theAnswerIsCorrect: false,
        pointsEarned: gameData.scoreInGame
    });

    const evaluateResponse = (res: Answers) => {
        if (response.showResponse) return;

        const theAnswerIsCorrect = answerQuestion(currentQuestion.correct_answer, res);
        const pointsEarned = evaluateScore(theAnswerIsCorrect, NUMBER_OF_QUESTIONS - list.length);

        setResponse({
            showResponse: true,
            theAnswerIsCorrect,
            pointsEarned
        })
    };


    // Finalizar ronda:
    const endRound = () => {
        setGameData((prev) => {
            if (!prev) return null;

            // Eliminamos el primero y nos quedamos con el resto
            const [, ...remainingQuestions] = prev.questions;

            return {
                ...prev,
                scoreInGame: prev.scoreInGame + response.pointsEarned,
                gameHistory: prev.gameHistory ? {
                    ...prev.gameHistory,
                    correctQuestions: response.theAnswerIsCorrect
                        ? prev.gameHistory.correctQuestions + 1
                        : prev.gameHistory.correctQuestions,
                    wrongQuestions: !response.theAnswerIsCorrect
                        ? prev.gameHistory.wrongQuestions + 1
                        : prev.gameHistory.wrongQuestions,
                    currentQuestion: prev.gameHistory.currentQuestion + 1
                } : null,
                questions: remainingQuestions
            };
        });

        setResponse({ showResponse: false, theAnswerIsCorrect: false, pointsEarned: 0 });
        setAllowAdd(true);
    };


    // Finalizar partida antes de terminar:
    const [endGame, setEndGame] = useState(false);
    const [allowAdd, setAllowAdd] = useState(false);

    const endGameManual = () => {
        setResponse({ showResponse: false, theAnswerIsCorrect: false, pointsEarned: 0 });
        setGameData((prev) => {
            if (!prev) return null;

            return {
                ...prev,
                scoreInGame: 0,
                questions: []
            }
        })

        setEndGame(true);
    };


    if (endGame || list.length <= 0) return <EndGame
        pointsEarned={gameData.scoreInGame}
        setGameData={setGameData}
        overallScore={overallScore}
        setOverallScore={setOverallScore}
        allowAdd={allowAdd}
        setAllowAdd={setAllowAdd}
    />;

    return <div>

        {/* Bloque de pregunta: */}
        <p>{currentQuestion.question}</p>
        <hr />
        <button onClick={() => evaluateResponse('A')}>{currentQuestion.options.A}</button>
        <button onClick={() => evaluateResponse('B')}>{currentQuestion.options.B}</button>
        <button onClick={() => evaluateResponse('C')}>{currentQuestion.options.C}</button>
        <button onClick={() => evaluateResponse('D')}>{currentQuestion.options.D}</button>


        {/* Mostrar contenido tras responder: */}
        {response.showResponse &&
            <>
                <div>
                    {response.theAnswerIsCorrect
                        ? <p>¡Correcta!</p>
                        : <p>¡Incorrecta!</p>
                    }
                </div>

                <p>Puntos ganados: +{response.pointsEarned}</p>
                {currentQuestion.clarification !== '' && <p>¡Aclaración!: {currentQuestion.clarification}</p>}
                <button onClick={endRound}>¡Continuar!</button>
            </>
        }

        {/* Volver al menú principal */}
        <div>
            <button onClick={endGameManual}>Volver al menú principal</button>
            <p>Los puntos ganados en esta ronda se perderán</p>
        </div>
    </div>;
}