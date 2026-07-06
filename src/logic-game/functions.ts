import { NUMBER_OF_QUESTIONS } from './constants';
import type { Answers, Question } from './interfaces';
import questions from './questions.json';

// OBTENER (x) preguntas aleatorias: 
export const getRandomQuestions = (n: number = NUMBER_OF_QUESTIONS): Question[] => {
    return [...questions as Question[]]
        .sort(() => Math.random() - 0.5) // Desordena el array. 
        .slice(0, n); // Toma los elementos del 0 al n. 
};

// RESPONDER pregunta: 
export const answerQuestion = (
    correctAnswer: Answers,
    userResponse: Answers
): boolean => {
    return correctAnswer === userResponse ? true : false
};

// EVALUAR puntaje: 
export const evaluateScore = (
    statusResponse: boolean,
    indexQuestion: number
): number => {
    if (statusResponse) {
        return Math.round(100 * (1 + (indexQuestion - 1) / 10));
    } else {
        return Math.round(50 * (1 - (indexQuestion - 1) / 20));
    }
};

// COMPROBAR record:
export const checkRecord = (
    currentScore: number,
    newScore: number
): number => {
    return newScore > currentScore ? newScore : currentScore;
};
