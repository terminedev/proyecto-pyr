import { useEffect, useState } from "react";
import MainMenu from "./interfaz/MainMenu/MainMenu";
import GameInProgress from './interfaz/GameInProgress/GameInProgress.tsx';
import type { GameData } from "./logic-game/interfaces";
import { getLocalStorage, setLocalStorage } from "./logic-game/memory";

export default function App() {

    // Verificamos si hay datos de una partida pendiente al entrar por primera vez:
    const [gameData, setGameData] = useState<GameData | null>(() => {
        const data = getLocalStorage('gameData');
        return data ? JSON.parse(data) : null;
    });


    // Cada vez que los datos locales cambian, se guardan en la memoria:
    useEffect(() => {
        setLocalStorage('gameData', gameData)
    }, [gameData])


    // Obtenemos el puntaje total:
    const [overallScore, setOverallScore] = useState(() => {
        const score = getLocalStorage('overallScore');
        return score ? parseInt(score) : 0;
    });


    // Si el juego no está en progreso se muestra el menú principal:
    return gameData
        ? <GameInProgress
            gameData={gameData}
            setGameData={setGameData}
            overallScore={overallScore}
            setOverallScore={setOverallScore}
        />
        : <MainMenu
            overallScore={overallScore}
            setGameData={setGameData}
        />
};