import { NUMBER_OF_QUESTIONS } from './constants';
import type { Answers, Question } from './interfaces';
import questions from './questions.json';

// OBTENER (x) preguntas aleatorias: 
const getRandomQuestions = (n: number = NUMBER_OF_QUESTIONS): Question[] => {
    return [...questions as Question[]]
        .sort(() => Math.random() - 0.5) // Desordena el array. 
        .slice(0, n); // Toma los elementos del 0 al n. 
};

// RESPONDER pregunta: 
const answerQuestion = (
    q: Question,
    res: Answers
): boolean => {

    return q.correct_answer === res ? true : false

};

// EVALUAR puntaje: 
const evaluateScore = (
    statusResponse: boolean,
    indexQuestion: number
): number => {
    if (statusResponse) {
        return 100 * (1 + (indexQuestion - 1) / 10);
    } else {
        return 50 * (1 - (indexQuestion - 1) / 20);
    }
};

// COMPROBAR record:
const checkRecord = (
    currentScore: number,
    newScore: number
): number => {
    return newScore > currentScore ? newScore : currentScore;
};
