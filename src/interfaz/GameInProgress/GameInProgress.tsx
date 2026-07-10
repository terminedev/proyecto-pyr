import type { GameData } from "../../logic-game/interfaces";
import QuizList from "../QuizList/QuizList";

// Definir la interface de Props
interface GameInProgressProps {
    overallScore: number;
    setOverallScore: React.Dispatch<React.SetStateAction<number>>;
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
}

export default function GameInProgress({
    overallScore,
    setOverallScore,
    gameData,
    setGameData }: GameInProgressProps) {

    const {
        scoreInGame,
        gameHistory,
        questions
    } = gameData;

    return <section className="center-web-page center-all" style={{ gap: '2rem' }}>
        <p className="score" style={{ textAlign: 'center' }}>¡Puntuación actual: <strong className="score-point">{scoreInGame}</strong>pts!</p>
        <ul className="center-list">
            <li className="score" style={{ filter: 'drop-shadow(0 0 3px #4f4f4f)' }}>Ahora: {gameHistory?.currentQuestion}</li>
            <li className="score" style={{ filter: 'drop-shadow(0 0 3px #4f4f4f)' }}>Totales: {gameHistory?.totalQuestions}</li>
            <li className="score" style={{ color: '#e3f7e3', filter: 'drop-shadow(0 0 3px #026406)' }}>Correctas: {gameHistory?.correctQuestions}</li>
            <li className="score" style={{ color: '#fa98a5', filter: 'drop-shadow(0 0 3px #940417)' }}>Erradas: {gameHistory?.wrongQuestions}</li>
        </ul>

        <QuizList
            list={questions}
            gameData={gameData}
            setGameData={setGameData}
            overallScore={overallScore}
            setOverallScore={setOverallScore}
        />
    </section>
};