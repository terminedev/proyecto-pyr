export interface Question {
    question: string;
    options: {
        'A': string,
        'B': string,
        'C': string,
        'D': string
    },
    correct_answer: Answers,
    clarification: string
}

export type Answers = 'A' | 'B' | 'C' | 'D';

export interface GameData {
    scoreInGame: number,
    gameHistory: GameHistory | null
    questions: Question[];
}

export interface GameHistory {
    totalQuestions: number,
    correctQuestions: number,
    wrongQuestions: number,
    currentQuestion: number
}