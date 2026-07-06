import type { GameData } from "../../logic-game/interfaces";
import QuizList from "../QuizList/QuizList";

// Definir la interface de Props
interface GameInProgressProps {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
}

export default function GameInProgress({ gameData, setGameData }: GameInProgressProps) {

    const {
        scoreInGame,
        gameHistory,
        questions
    } = gameData;

    return <section className="center-web-page center-all" style={{ gap: '1rem' }}>
        <p style={{ textAlign: 'center' }}>¡Puntuación actual: <strong>{scoreInGame}</strong>pts!</p>
        <ul className="center-list ">
            <li>Ahora: {gameHistory?.currentQuestion}</li>
            <li>Totales: {gameHistory?.totalQuestions}</li>
            <li style={{ color: 'green' }}>Correctas: {gameHistory?.correctQuestions}</li>
            <li style={{ color: 'red' }}>Erradas: {gameHistory?.wrongQuestions}</li>
        </ul>

        <QuizList list={questions} setGameData={setGameData} />
    </section>
};