import { useState } from "react";
import type { Answers, GameData, Question } from "../../logic-game/interfaces";
import { answerQuestion, evaluateScore } from "../../logic-game/functions";
import { NUMBER_OF_QUESTIONS } from "../../logic-game/constants";

interface QuizListProps {
    list: Question[];
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
}

export default function QuizList({ list, setGameData }: QuizListProps) {

    // Pregunta actual:
    const currentQuestion = list[0];


    // Evaluar respuesta:
    const [response, setResponse] = useState({
        showResponse: false,
        theAnswerIsCorrect: false,
        pointsEarned: 0
    });

    const evaluateResponse = (res: Answers) => {
        if (response.showResponse) return;

        const theAnswerIsCorrect = answerQuestion(currentQuestion.correct_answer, res);
        const pointsEarned = evaluateScore(theAnswerIsCorrect, 0);

        setResponse({
            showResponse: true,
            theAnswerIsCorrect,
            pointsEarned
        })
    };


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
                <button>¡Continuar!</button>
            </>
        }
    </div>;
}