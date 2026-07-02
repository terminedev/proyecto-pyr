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