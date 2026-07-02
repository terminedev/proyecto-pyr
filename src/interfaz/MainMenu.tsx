import { useState } from "react"
import { getOverallScore, resetOverallScore } from "../logic-game/memory";

export default function MainMenu() {

    const [overallScore, _setOverallScore] = useState(getOverallScore());

    return <section className="center-web-page center-all" style={{ gap: '2rem' }}>

        <div className="center-all" style={{ gap: '1rem' }}>
            <h1>Exe World: <strong>Archivos E</strong></h1>
            <p>Puntaje total: <strong>{overallScore}</strong>pts</p>
        </div>


        <hr style={{ width: '300px' }} />

        <div className="center-all" style={{ gap: '1rem' }}>
            <button>¡Jugar Partida!</button>
            <div className="center-all" style={{ gap: '0px' }}>
                <button onClick={resetOverallScore}>
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