import { useState } from "react"
import { getLocalStorage, setLocalStorage } from "../../logic-game/memory";
import type { GameData } from "../../logic-game/interfaces";

export default function MainMenu({ setGameInProgress }) {

    const [overallScore, _setOverallScore] = useState(() => {
        const score = getLocalStorage('overallScore');
        return score ? parseInt(score) : 0;
    });

    return <section className="center-web-page center-all" style={{ gap: '2rem' }}>

        <div className="center-all" style={{ gap: '1rem' }}>
            <h1>Exe World: <strong>Archivos E</strong></h1>
            <p>Puntaje total: <strong>{overallScore}</strong>pts</p>
        </div>


        <hr style={{ width: '300px' }} />

        <div className="center-all" style={{ gap: '1rem' }}>
            <button onClick={() => {
                setGameInProgress(true)

                // Crear un nuevo Game Data
                setLocalStorage('gameData', {
                    gameInProgress: true
                } as GameData)

            }}>¡Jugar Partida!</button>
            <div className="center-all" style={{ gap: '0px' }}>
                <button onClick={() => setLocalStorage('overallScore', 0)}>
                    Reiniciar puntaje total
                </button>
                <strong style={{ color: 'red' }}>¡Esta opción no se puede deshacer!</strong>
            </div>
        </div>

        <div className="center-all" style={{ gap: '1rem' }}>
            <p>Ver: 1.0</p>
            <a
                href="https://github.com/terminedev"
                target="_blank"
                rel="noreferrer"
                aria-label="Visitar perfil de GitHub de Gastón Términe"
            >
                Gastøn Términe 2026
            </a>
        </div>
    </section>
};