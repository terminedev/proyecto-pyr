
// OBTENER el puntaje general almacenado en el local storage:
export const getOverallScore = (): number => {
    const score = localStorage.getItem('overallScore');
    return score !== null ? parseInt(score) : 0;
}

// RESETEAR el puntaje general en el local storage:
export const resetOverallScore = (): void => {
    localStorage.setItem('overallScore', '0');
}