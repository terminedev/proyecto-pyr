import { setLocalStorage } from "../../logic-game/memory";
import type { GameData } from "../../logic-game/interfaces";
import { NUMBER_OF_QUESTIONS } from "../../logic-game/constants";
import { getRandomQuestions } from "../../logic-game/functions";

import mainMenuStyles from './MainMenu.module.css';

// Definir la interface de Props
interface MainMenuProps {
    overallScore: number;
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
    setOverallScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function MainMenu({
    overallScore,
    setGameData,
    setOverallScore
}: MainMenuProps) {


    return <section className="center-web-page center-all" style={{ gap: '2rem' }}>

        <div className={`${mainMenuStyles.mainMenuBg} center-all`} style={{ gap: '1rem', textAlign: 'center', marginBottom: '2rem' }}>
            <h1 className={mainMenuStyles.title}>Exe World: <div className={mainMenuStyles.subtitle}>Archivos E</div></h1>
            <p className="score">Puntaje total: <strong className="score-point">{overallScore}</strong>pts</p>
        </div>

        <div className="center-all" style={{ gap: '.5rem' }}>
            <button onClick={() => {

                // Crear un nuevo Game Data
                const gameDataDefault = {
                    scoreInGame: 0,
                    gameHistory: {
                        correctQuestions: 0,
                        currentQuestion: 0,
                        totalQuestions: NUMBER_OF_QUESTIONS,
                        wrongQuestions: 0
                    },
                    questions: [...getRandomQuestions()]
                } as GameData;

                // Actualizar los datos del juego:
                setGameData(gameDataDefault)

            }}
                className="boton-retro"
                style={{ color: '#5CFFF4', border: '2px solid #5CFFF4' }}
            >
                ¡Jugar Partida!
            </button>
            <div className="center-all" style={{ gap: '0px' }}>
                <button
                    onClick={() => {
                        setLocalStorage('overallScore', 0);
                        setOverallScore(0);
                    }}
                    className="boton-retro"
                    style={{ color: '#FF85AD', border: '2px solid #FF85AD' }}
                >
                    Reiniciar puntaje total
                </button>
                <strong style={{ color: '#FF85AD', fontSize: 'var(--fs-h5)' }}>¡Esta opción no se puede deshacer!</strong>
            </div>
        </div>

        <div className="center-all" style={{ gap: '1rem', fontSize: 'var(--fs-h5)', color: 'white' }}>
            <p>Ver: 1.0</p>
            <a
                href="https://github.com/terminedev"
                target="_blank"
                rel="noreferrer"
                aria-label="Visitar perfil de GitHub de Gastón Términe"
                style={{ color: 'white' }}
            >
                Gastøn Términe 2026
            </a>
        </div>
    </section>
};