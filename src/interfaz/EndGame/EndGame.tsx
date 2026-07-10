import { useEffect, useState } from "react";
import { checkRecord } from "../../logic-game/functions";
import type { GameData } from "../../logic-game/interfaces";
import { setLocalStorage } from "../../logic-game/memory";

// Definir la interface de Props para asegurar el tipado correcto
interface EndGameProps {
    pointsEarned: number;
    setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
    overallScore: number;
    setOverallScore: React.Dispatch<React.SetStateAction<number>>;
    allowAdd: boolean;
    setAllowAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EndGame({
    pointsEarned,
    setGameData,
    setOverallScore,
    allowAdd,
    setAllowAdd
}: EndGameProps) {

    // Estado local para manejar si se rompió el record tras la actualización
    const [isRecord, setIsRecord] = useState(false);
    const [newTotalScore, setNewTotalScore] = useState(0);

    useEffect(() => {
        console.log(allowAdd);

        if (allowAdd) {
            // Actualizar el score total solo si no excede el límite:
            setOverallScore(prev => {

                const updatedScore = prev + pointsEarned;

                // Actualizamos el puntaje general en memoria:
                setLocalStorage('overallScore', updatedScore)

                setNewTotalScore(updatedScore);

                //Verificar el record con el nuevo valor calculado:
                setIsRecord(checkRecord(prev, updatedScore));
                return updatedScore <= 99999 ? updatedScore : prev;
            });

            setAllowAdd(false);
        }

    }, [pointsEarned, setOverallScore]);

    return (
        <section>
            <p>¡Partida finalizada!</p>

            <p>Puntos ganados: +{pointsEarned}.</p>
            <p>Puntaje total: {newTotalScore}</p>

            {/* Mostrar mensaje de record si la validación es verdadera */}
            {isRecord && <p>¡Nuevo record!</p>}

            <button onClick={() => setGameData(null)}>
                Volver al menú principal
            </button>
        </section>
    );
}