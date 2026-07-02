import { useState } from "react";
import MainMenu from "./interfaz/MainMenu/MainMenu";
import GameInProgress from './interfaz/GameInProgress/GameInProgress';
import type { GameData } from "./logic-game/interfaces";
import { getLocalStorage } from "./logic-game/memory";

export default function App() {

    // Verificamos si hay datos de una partida pendiente al entrar por primera vez:
    const [gameData, _setGameData] = useState<GameData>(() => {
        const data = getLocalStorage('gameData');
        return data ? JSON.parse(data) : null;
    });

    // Si un juego está en progreso:
    const [gameInProgress, setGameInProgress] = useState(() => gameData?.gameInProgress || false);

    // Si el juego no está en progreso se muestra el menú principal:
    return gameInProgress
        ? <GameInProgress gameData={gameData} />
        : <MainMenu setGameInProgress={setGameInProgress} />
};