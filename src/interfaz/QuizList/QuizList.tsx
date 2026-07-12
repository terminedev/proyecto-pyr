import { useState } from "react";
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

    return <section className="center-all" style={{ gap: '.5rem', marginTop: '2rem' }}>

        {/* Bloque de pregunta: */}
        <p style={{ textAlign: 'center', backgroundColor: '#040436c2', fontSize: 'var(--fs-h4)', padding: '2rem', marginBottom: '1rem' }}>{currentQuestion.question}</p>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90vw',
            gap: '7px',
            textAlign: 'start',
            padding: 0,
            marginBottom: '1rem'
        }}>
            <button className="boton-retro btn-action" style={{ margin: '0' }} onClick={() => evaluateResponse('A')}>{currentQuestion.options.A}</button>
            <button className="boton-retro btn-action" style={{ margin: '0' }} onClick={() => evaluateResponse('B')}>{currentQuestion.options.B}</button>
            <button className="boton-retro btn-action" style={{ margin: '0' }} onClick={() => evaluateResponse('C')}>{currentQuestion.options.C}</button>
            <button className=" boton-retro btn-action" style={{ margin: '0' }} onClick={() => evaluateResponse('D')}>{currentQuestion.options.D}</button>
        </div>


        {/* Mostrar contenido tras responder: */}
        {response.showResponse &&
            <section className="center-all" style={{
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.693)',
                border: '1px solid white',
                fontSize: 'var(--fs-h4)',
                textAlign: 'center'
            }}>
                <div>
                    {response.theAnswerIsCorrect
                        ? <p style={{ color: '#e3f7e3', filter: 'drop-shadow(0 0 3px #026406)' }}>¡Correcta!</p>
                        : <p style={{ color: '#fa98a5', filter: 'drop-shadow(0 0 3px #940417)' }}>¡Incorrecta!</p>
                    }
                </div>

                <p>Puntos ganados: +{response.pointsEarned}</p>
                {currentQuestion.clarification !== '' && <p>¡Aclaración!: {currentQuestion.clarification}</p>}
                <button className="boton-retro" onClick={endRound}>¡Continuar!</button>
            </section>
        }

        {/* Volver al menú principal */}
        <div className="center-all">
            <button onClick={endGameManual} className="boton-retro"
                style={{ color: '#FF85AD', border: '2px solid #FF85AD' }}>Volver al menú principal</button>
            <p style={{ fontSize: 'var(--fs-h5)' }}>Los puntos ganados en esta ronda se perderán</p>
        </div>
    </section>;
}